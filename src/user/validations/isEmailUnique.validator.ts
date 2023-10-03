import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserDatabase } from "../user.database";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
    
    constructor(private UserDatabase: UserDatabase) {
        
    }

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const userExists = await this.UserDatabase.emailExists(email)
        return !userExists;
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