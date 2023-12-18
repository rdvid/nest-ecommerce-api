import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/user/user.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() orderData: CreateOrderDto
    ) {
    const createdOrder = await this.orderService.createOrder(
      userId, 
      orderData
    );
    return createdOrder;
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.orderService.getOrders(userId)
  }

  
}
