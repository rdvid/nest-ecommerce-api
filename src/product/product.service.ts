import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EditProductDto } from "./dto/editProduct.dto";
import { ListProductDto } from "./dto/listProduct.dto";
import { CreateProductDto } from "./dto/createProduct.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productDatabase: Repository<ProductEntity>
    ) {}

    async createProduct(productData: CreateProductDto){
        const product = new ProductEntity();

        product.id = uuid();
        product.name = productData.name;
        product.value = productData.value;
        product.availableQuantity = productData.availableQuantity;
        product.description = productData.description;
        product.characteristics = productData.characteristics
        product.category = productData.category
        product.images = productData.images
    
        return await this.productDatabase.save(product)
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
            return "Not Found"
        }

        const productList = products.map((product) => new ListProductDto(
            product.id,
            product.name,
            product.characteristics,
            product.images
        ));

        return id ? productList[0] : productList;
    }

    async editProduct(id: string, productUpdated: EditProductDto){
        const user = await this.productDatabase.update(id, productUpdated)
    }

    async deleteProduct(id: string){
        await this.productDatabase.delete(id)
    }

}
