import { Module } from "@nestjs/common";
import { ProductDatabase } from "./product.database";
import { ProductController } from "../product/product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    providers: [ProductService, ProductDatabase],
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController]
})
export class ProductModule{};