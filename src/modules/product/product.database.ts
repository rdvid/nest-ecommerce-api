import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductDatabase {

    private products = [];

    async saveProduct(product: ProductEntity){

    }

    async listProducts(){
        return this.products;
    }
}