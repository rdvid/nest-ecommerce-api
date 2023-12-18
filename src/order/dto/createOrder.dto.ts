import { Type } from "class-transformer";
import { 
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty, 
    IsNumber,  
    Min } from "class-validator";

class OrderItemDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

}

export class CreateOrderDto {

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
    
}
