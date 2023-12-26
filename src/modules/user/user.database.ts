import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserDatabase {

    private users: UserEntity[] = [];
    
    private async GetUserById(id:string) {
        const user = this.users.find((user) => { return user.id === id})
        
        if(!user){
            throw new Error('user not found')
        }

        return user;
    }

    async saveUser(user: UserEntity){
        this.users.push(user);
    }

    async listUsers(){
        return this.users;
    }

    async emailExists(email:string){
        const user = this.users.find((user) => { return user.email === email});
        return user !== undefined;
    }

    async getUser(id: string){
        const user = this.GetUserById(id);
        return user
    }

    async editUser(id: string, newUserData: Partial<UserEntity>){
        const user = this.GetUserById(id);
        
        Object.entries(newUserData).forEach(([key, value]) => {
            if(key === 'id'){
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async deleteUser(id: string) {
        const user = this.GetUserById(id);
        this.users = this.users.filter(
            user => user.id !== id
        )

        return user;
    }
   
}

