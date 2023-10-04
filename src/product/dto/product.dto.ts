import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsEmpty, IsNotEmpty, 
        IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    value: number;

    @Min(0)
    quantityAvailable: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    description: string;

    @IsArray()
    @ArrayMinSize(3)
    characteristics: ProductCharacteristicDto[];

    @IsArray()
    @ArrayNotEmpty()
    images: ProductImageDto[];

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsNumber()
    @IsOptional()
    userId: number;
}


class ProductCharacteristicDto {
    @IsString()
    name: string;
    
    @IsString()
    @MaxLength(255)
    description: string;
}

class ProductImageDto {
    @IsString()
    url: string;
    
    @IsString()
    @MaxLength(255)
    description: string;
}

