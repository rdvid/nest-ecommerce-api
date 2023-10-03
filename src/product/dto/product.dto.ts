import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, 
        IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    value: number;

    @Min(0)
    quantity: number;

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

