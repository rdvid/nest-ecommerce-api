import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductDatabase {

    private products = [];

    async saveProduct(product){
        this.products.push(product);
    }

    async listProducts(){
        return this.products;
    }
}