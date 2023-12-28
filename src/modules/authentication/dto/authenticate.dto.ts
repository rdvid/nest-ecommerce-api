import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthenticateDto {

    @IsEmail(undefined, { message: 'please inform a valid email' })
    email: string;

    @IsNotEmpty({ message: 'password is required' })
    password: string;
}
