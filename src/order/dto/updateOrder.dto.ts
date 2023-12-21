import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, OrderItemDto } from './createOrder.dto';
import { Type } from "class-transformer";
import { 
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsNotEmpty, 
    IsNumber,  
    IsUUID,  
    Min } from "class-validator";
import { OrderStatus } from '../enum/orderstatus.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsEnum(OrderStatus)
    status: OrderStatus;

}

