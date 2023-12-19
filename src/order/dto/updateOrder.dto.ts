import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrder.dto';
import { Type } from "class-transformer";
import { 
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty, 
    IsNumber,  
    IsUUID,  
    Min } from "class-validator";

class OrderItemDto {

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];

}

