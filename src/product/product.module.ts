import { Module } from "@nestjs/common";
import { ProductDatabase } from "./product.database";
import { ProductController } from "src/controller/product.controller";

@Module({
    providers: [ProductDatabase],
    imports: [],
    controllers: [ProductController]
})
export class ProductModule{};