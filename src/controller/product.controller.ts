import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ProductDatabase } from "src/product/product.database";

@Controller('/products')
export class ProductController{

    constructor(private productDatabase: ProductDatabase) {}

    @Post()
    async createProduct(@Body() userData){
        this.productDatabase.saveProduct(userData);
        return userData;
    }

    @Get()
    async listProducts(){
        return this.productDatabase.listProducts();
    }


}
