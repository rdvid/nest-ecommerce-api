import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateProductDto } from "src/modules/product/dto/createProduct.dto";
import { ProductService } from "src/modules/product/product.service";
import { Cache } from "cache-manager";
import { ProductEntity } from "./product.entity";

@Controller('/products')
export class ProductController{

    constructor(private productService: ProductService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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
    // @UseInterceptors(CacheInterceptor)
    async getProduct(@Param('id') id: string){
        
        let product = await this.cacheManager.get<ProductEntity>(`product-${id}`);

        if(!product){
            product = await this.productService.listProducts(id) as ProductEntity;
            await this.cacheManager.set(`product-${id}`, product);
        }

        return {
            message: "product found",
            product
        }
        
        
        
    }


}
