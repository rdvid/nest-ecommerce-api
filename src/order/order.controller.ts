import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { UserEntity } from 'src/user/user.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() orderData: CreateOrderDto
    ) {

    if(!userId){
      return "User ID is mandatory"
    }

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
  
  @Put('/:id')
  async editOrder(@Param() id: string, @Body() updateOrderData: UpdateOrderDto){
    // TODO: fix put order route
    const updatedOrder = await this.orderService.editOrder(id['id'], updateOrderData);
    return updatedOrder;
  }

  
}
