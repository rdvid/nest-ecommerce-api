import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { v4 as uuid } from 'uuid';
import { OrderStatus } from './enum/orderstatus.enum';

@Injectable()
export class OrderService {
  
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  
  async createOrder(userId: string){
    const user = await this.userRepository.findOneBy({id: userId});
    const orderEntity = new OrderEntity();

    orderEntity.totalAmount = 0;
    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.user = user;

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
  }

}
