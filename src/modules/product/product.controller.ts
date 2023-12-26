import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateProductDto } from "src/modules/product/dto/createProduct.dto";
import { ProductService } from "src/modules/product/product.service";

@Controller('/products')
export class ProductController{

    constructor(private productService: ProductService) {}

    @Post()
    async createProduct(@Body() productData: CreateProductDto){
        
        const newProduct = await this.productService.createProduct(productData)
       
        return { 
            message: 'product created successfully',
            product : newProduct, 
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
