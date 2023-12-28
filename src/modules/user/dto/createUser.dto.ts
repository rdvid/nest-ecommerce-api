import { IsEmail, IsString, MinLength, IsNotEmpty, Matches, MaxLength } from "class-validator";
import { isEmailUnique } from "../validations/isEmailUnique.validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @isEmailUnique({ message: 'an user with this email already exists'})
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/,{message:  'password must contains at least one uppercase character, one lowercase character, one digit, one special character and have min 8 and max 30 characteres'})
    password: string;
    
}
