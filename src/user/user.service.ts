import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ListUserDto } from "./dto/listUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { EditUserDto } from "./dto/editUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
 
@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userDatabase: Repository<UserEntity>
    ) {}

    public async listUsers() {

        const users = await this.userDatabase.find();
        const userList = users.map((user) => new ListUserDto(user.id, user.name, user.email))
        
        return userList;
    }

    public async retrieveUser(id?: string, email?: string){
        
        let param: Object;

        param = {
            where: [
                id ? id : {},
                email ? { email: email } : {}
            ]
        }
            
        const [user] = await this.userDatabase.find(param);
       
        if(!user){
            throw new NotFoundException('User not found')
        }

        const retrievedUser = new ListUserDto(user.id, user.name, user.email);

        return retrievedUser;
    }

    public async createUser(user: CreateUserDto) {



        const newUser = new UserEntity();

        Object.assign(newUser, user as UserEntity);
        
        return await this.userDatabase.save(newUser);

    }


    public async editUser(id: string, userUpdateData: EditUserDto){

        try {
            
            const user = await this.userDatabase.findOneBy({id});
    
            if(!user){
                throw new NotFoundException('User not found');
            }
    
            Object.assign(user, userUpdateData);
    
            return await this.userDatabase.save(user);
            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }

    }

   
    public async deleteUser(id: string) {
        //TODO: fix delete constraint fk problem
        const resultado = await this.userDatabase.delete(id);

        if (!resultado.affected){
            throw new NotFoundException('O usuário não foi encontrado.');
        }
    }

    async emailExists(email:string){
        const user = await this.userDatabase.findOneBy({email});
        return user !== undefined;
    }

}