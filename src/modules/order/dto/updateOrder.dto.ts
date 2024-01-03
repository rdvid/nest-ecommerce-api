import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrder.dto';
import { IsEnum } from "class-validator";
import { OrderStatus } from '../enum/orderstatus.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsEnum(OrderStatus)
    status: OrderStatus;

}

