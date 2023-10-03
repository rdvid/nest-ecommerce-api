import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { UserDatabase } from "./user.database";
import { IsEmailUniqueValidator } from "./validations/isEmailUnique.validator";

@Module({
    providers: [UserDatabase, IsEmailUniqueValidator],
    controllers: [UserController],
    imports: []
})

export class UserModule{};