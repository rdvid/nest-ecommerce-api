import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./createProduct.dto";

export class EditProductDto extends PartialType(CreateProductDto){}



