import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateProductDto } from "src/product/dto/product.dto";
import { ProductDatabase } from "src/product/product.database";

@Controller('/products')
export class ProductController{

    constructor(private productDatabase: ProductDatabase) {}

    @Post()
    async createProduct(@Body() productData: CreateProductDto){
        this.productDatabase.saveProduct(productData);
        return productData;
    }

    @Get()
    async listProducts(){
        return this.productDatabase.listProducts();
    }


}
