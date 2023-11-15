import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsEmpty, IsNotEmpty, 
    IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { ProductEntity } from "../product.entity";
import { Type } from "class-transformer";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    value: number;

    @Min(0)
    availableQuantity: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    description: string;

    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CreateProductCharacteristicDto)
    characteristics: CreateProductCharacteristicDto[];

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => CreateProductImageDto)
    images: CreateProductImageDto[];

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsOptional()
    @IsString()
    userId: string;
}

class CreateProductCharacteristicDto {

    id: string; 

    @IsString()
    name: string;
    
    @IsString()
    @MaxLength(255)
    description: string;

    product: ProductEntity;
}

class CreateProductImageDto {

    id: string; 

    @IsString()
    url: string;
    
    @IsString()
    @MaxLength(255)
    description: string;

    product: ProductEntity;

}

