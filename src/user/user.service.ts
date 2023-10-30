import { Injectable } from "@nestjs/common";
import { ListUserDto } from "./dto/listUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDatabase } from "./user.database";
import { EditUserDto } from "./dto/editUser.dto";
 
@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userDatabase: Repository<UserEntity>
    ) {}

    public async listUsers(id?: string) {

        let param: Object;

        id ? param = {
            where: {
                id
            }
        }: param = {};

        const users = await this.userDatabase.find(param);
        const userList = users.map((user) => new ListUserDto(user.id, user.name))
        
        return id ? userList[0] : userList;
    }

    public async createUser(user: UserEntity) {
        await this.userDatabase.save(user);
    }


    public async editUser(id: string, userUpdateData: EditUserDto){
       await this.userDatabase.update(id, userUpdateData)
    }

   
    public async deleteUser(id: string) {
        await this.userDatabase.delete(id);
    }
}