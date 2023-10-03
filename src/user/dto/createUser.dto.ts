import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { isEmailUnique } from "../validations/isEmailUnique.validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    @isEmailUnique({ message: 'an user with this email already exists'})
    email: string;

    @MinLength(6)
    password: string;
}
