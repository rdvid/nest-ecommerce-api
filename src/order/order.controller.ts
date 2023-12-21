import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, InternalServerErrorException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

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
  
  @Patch('/:id')
  async editOrder(
    @Param() id: string, 
    @Body() updateOrderData: UpdateOrderDto
  ){
    return await this.orderService.editOrder(id['id'], updateOrderData);     
  }

  @Delete('/:id')
  async deleteOrder(@Param() id: string){
    // TODO: develop delete order route
  }
  
}
