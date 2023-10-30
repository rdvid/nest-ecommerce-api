import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { isEmailUnique } from "../validations/isEmailUnique.validator";

export class EditUserDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @isEmailUnique({ message: 'an user with this email already exists'})
    @IsOptional()
    email: string;

    @MinLength(6)
    @IsOptional()
    password: string;
}
