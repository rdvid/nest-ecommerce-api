import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EditProductDto } from "./dto/editProduct.dto";
import { ListProductDto } from "./dto/listProduct.dto";

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productDatabase: Repository<ProductEntity>
    ) {}

    async createProduct(productEntity: ProductEntity){
        await this.productDatabase.save(productEntity)
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
            console.log(products)
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