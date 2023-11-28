import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsEmpty, IsNotEmpty, 
    IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { UUID } from "crypto";
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";

export class CreateOrderDto {

    @IsUUID()
    user: UUID

    @IsUUID()
    product: UUID  

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalAmount: number;

}
