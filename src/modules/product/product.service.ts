import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EditProductDto } from "./dto/editProduct.dto";
import { ListProductDto } from "./dto/listProduct.dto";
import { CreateProductDto } from "./dto/createProduct.dto";

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productDatabase: Repository<ProductEntity>
    ) {}

    async createProduct(productData: CreateProductDto){
        const product = new ProductEntity();

        Object.assign(product, productData as ProductEntity);

        product.createdAt = new Date();
        product.updatedAt = new Date();
        
        const newProduct = await this.productDatabase.save(product)
        
        return newProduct
    }

    async listProducts(id?:string, name?: string){
        // apply query param for filtering 
        let param: Object;

        id ? param = {
            where: {
                id: id
            }
        } : param = {};
        
        const products = await this.productDatabase.find(param);

        if(id && !products.length){
            throw new NotFoundException("Not Found")
        }

        const productList = products.map((product) => new ListProductDto(
            product.id,
            product.name,
            product.characteristics,
            product.images
        ));

        return id ? productList[0] : productList;
    }

    async editProduct(id: string, newProductData: EditProductDto){
        const product = await this.productDatabase.findOneBy({id});

        if(!product){
            throw new NotFoundException(`Product ${id} not found`)
        }

        Object.assign(product, newProductData as ProductEntity)

        return await this.productDatabase.save(product)
    }

    async deleteProduct(id: string){
        await this.productDatabase.delete(id)
    }

}
