import { Injectable } from "@nestjs/common";
import { format } from 'date-fns';
import { CreateProductDto } from "./dto/createProduct.dto";
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