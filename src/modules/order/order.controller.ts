import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { AuthenticationGuard, RequestWithUser } from '../authentication/authentication.guard';

@Controller('order')
@UseGuards(AuthenticationGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: RequestWithUser,
    @Body() orderData: CreateOrderDto
  ) {
    
    const userId = req.user.sub;
    
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
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.orderService.getOrders(userId)
  }
  
  @Patch('/:id')
  async editOrder(
    @Param('id') orderId: string, 
    @Req() req: RequestWithUser,
    @Body() updateOrderData: UpdateOrderDto
  ){
    const userId = req.user.sub;
    return await this.orderService.editOrder(userId, orderId, updateOrderData);     
  }

  @Delete('/:id')
  async deleteOrder(@Param() id: string){
    // TODO: develop delete order route
  }
  
}
