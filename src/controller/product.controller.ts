import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateProductDto } from "src/product/dto/createProduct.dto";
import { ProductEntity } from "src/product/product.entity";
import { ProductService } from "src/product/product.service";
import { v4 as uuid } from 'uuid';

@Controller('/products')
export class ProductController{

    constructor(private productService: ProductService) {}

    @Post()
    async createProduct(@Body() productData: CreateProductDto){
        const product = new ProductEntity();
        product.id = uuid();
        product.name = productData.name;
        product.value = productData.value;
        product.quantity = productData.quantityAvailable;
        product.description = productData.description;
        product.userId = productData.userId
        product.category = productData.category
        product.createdAt = new Date();
    
        product.name = productData.name;
        product.name = productData.name;
        
        await this.productService.createProduct(product)
        
        return { 
            id : product.id, 
            message: 'product created successfully' 
        };
    }

    @Get()
    async listProducts(){
        // TODO: implement feature of query filtering
        return this.productService.listProducts();
    }

    @Get('/:id')
    async getProduct(@Param() id: string){
        return this.productService.listProducts(id['id'])
    }


}
