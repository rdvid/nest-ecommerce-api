import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { v4 as uuid } from 'uuid';
import { OrderStatus } from './enum/orderstatus.enum';
import { OrderItemEntity } from './orderitem.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ){}

  
  async createOrder(userId: string, orderData: CreateOrderDto){
    const user = await this.userRepository.findOneBy({id: userId});
    const productIds = orderData.orderItems.map((orderItem) => orderItem.productId)
    const productsRelated = await this.productRepository.findBy({id:In(productIds)})

    const orderEntity = new OrderEntity();  

    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.user = user;

    const orderItemsEntities = orderData.orderItems.map((orderItem) => {

      const productRelated = productsRelated.find((product) => product.id === orderItem.productId)
      const orderItemEntity = new OrderItemEntity();

      orderItemEntity.sellPrice = productRelated.value
      orderItemEntity.quantity = orderItem.quantity
      orderItemEntity.product = productRelated
      orderItemEntity.product.availableQuantity -= orderItem.quantity

      return orderItemEntity;
    })

    orderEntity.orderItems = orderItemsEntities;

    orderEntity.totalAmount = orderItemsEntities.reduce((total, item ) => {
      return total + item.sellPrice * item.quantity
    }, 0)

    const orderCreated = await this.orderRepository.save(orderEntity);
    return orderCreated;

  }

  async getOrders(userId: string){
    const orders = await this.orderRepository.find({ 
      where: {
        user: { id: userId } 
      },
      relations: {
        user: true
      }
    })

    return orders
  }

  async editOrder(orderId:string, newOrderData: UpdateOrderDto){
    const order = await this.orderRepository.update(orderId, newOrderData);
    return order;
  }

}
