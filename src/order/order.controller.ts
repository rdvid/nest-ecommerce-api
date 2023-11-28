import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/user/user.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Query('userId') userId: string) {
    return this.orderService.createOrder(userId);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.orderService.getOrders(userId)
  }

  
}
