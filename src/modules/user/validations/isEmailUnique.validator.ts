import { 
    ValidationOptions, 
    ValidatorConstraint, 
    ValidatorConstraintInterface, 
    registerDecorator } from "class-validator";
import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
    
    constructor(
        private readonly userDatabase: UserService){
    }

    async validate(email: string): Promise<boolean> {

        try {
            const userExists = await this.userDatabase.emailExists(email);
            return !userExists;
        } catch (error) {
            if(error !== HttpException){
                return true;
            }
            throw error
        }
    }

}

export const isEmailUnique = (options: ValidationOptions) => {
    return (obj: Object, property: string) => {
        registerDecorator({
            target: obj.constructor, 
            propertyName: property,
            options: options,
            constraints: [],
            validator: IsEmailUniqueValidator
        });
    }
}