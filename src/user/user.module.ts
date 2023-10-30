import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { UserDatabase } from "./user.database";
import { IsEmailUniqueValidator } from "./validations/isEmailUnique.validator";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserDatabase, IsEmailUniqueValidator],
})

export class UserModule{};