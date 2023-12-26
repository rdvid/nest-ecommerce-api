import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { OrderItemEntity } from './orderitem.entity';
import { ProductEntity } from '../product/product.entity';
import { ListOrderDto } from './dto/listOrder.dto';
import { ListUserDto } from 'src/modules/user/dto/listUser.dto';

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

  private async searchUser(id:string){
    const user = await this.userRepository.findOneBy({id});

    if(!user){
      throw new NotFoundException('User not found')
    }

    return user;
  }

  private handleOrderData(
    orderData: CreateOrderDto, 
    relatedProducts: ProductEntity[]
  ){
    orderData.orderItems.forEach((orderItem) => {
      const productRelated = relatedProducts.find(
        (product) => product.id === orderItem.productId
      );

      if(!productRelated){
        throw new NotFoundException(`Product with id ${orderItem.productId} not found`)
      }

      if(orderItem.quantity > productRelated.availableQuantity){
        throw new BadRequestException(
          `The amount available ${orderItem.quantity} of ${productRelated.name} is not enough to proceed this order.
          Available quantity: ${productRelated.availableQuantity}`)
      }

    })
  }

  async createOrder(userId: string, orderData: CreateOrderDto){
    const user = await this.searchUser(userId)

    const productIds = orderData.orderItems.map((orderItem) => orderItem.productId)
    const productsRelated = await this.productRepository.findBy({id:In(productIds)})

    const orderEntity = new OrderEntity();  

    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.user = user;

    this.handleOrderData(orderData, productsRelated);

    const orderItemsEntities = orderData.orderItems.map((orderItem) => {
      const productRelated = productsRelated.find((product) => product.id === orderItem.productId)

      const orderItemEntity = new OrderItemEntity();

      orderItemEntity.sellPrice = productRelated!.value
      orderItemEntity.quantity = orderItem.quantity
      orderItemEntity.product = productRelated!
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

    const orderList = orders.map((order) => new ListOrderDto(
      order.id,
      order.totalAmount,
      order.status,
      order.createdAt,
      new ListUserDto(order.user.id, order.user.name, order.user.email)
    ))

    return orderList
  }

  async editOrder(orderId:string, newOrderData: UpdateOrderDto){
    
    
    const order = await this.orderRepository.findOneBy({ id: orderId });

    if(!order){
      throw new NotFoundException('Order not found') 
    }

    Object.assign(order, newOrderData);

    return this.orderRepository.save(order);
  }

}
