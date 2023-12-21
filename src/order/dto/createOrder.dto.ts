import { Type } from "class-transformer";
import { 
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty, 
    IsNumber,  
    IsUUID,  
    Min } from "class-validator";

export class OrderItemDto {

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

export class CreateOrderDto {

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
    
}
