import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDatabase {

    private users = [];

    async saveUser(user){
        this.users.push(user);
    }

    async listUsers(){
        return this.users;
    }

    async emailExists(email){
        const user = this.users.find((user) => { return user.email === email});
        return user !== undefined;
    }

   
}