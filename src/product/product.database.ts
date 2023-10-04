import { Injectable } from "@nestjs/common";
import { format } from 'date-fns';
import { CreateProductDto } from "./dto/product.dto";
@Injectable()
export class ProductDatabase {

    private products = [];

    async saveProduct(product){
        product.createdAt = format(new Date(), 'dd-mm-yyyy')
        product.updatedAt = format(new Date(), 'dd-mm-yyyy')
        this.products.push(product);
    }

    async listProducts(){
        return this.products;
    }
}