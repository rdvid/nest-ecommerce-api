import { Module } from "@nestjs/common";
import { UserController } from "../user/user.controller";
import { UserDatabase } from "./user.database";
import { IsEmailUniqueValidator } from "./validations/isEmailUnique.validator";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserDatabase, IsEmailUniqueValidator],
    exports: [UserService]
})

export class UserModule{};