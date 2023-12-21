import { Body, Controller, Get, Param, Post, Query, Put, Delete } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { EditUserDto } from "src/user/dto/editUser.dto";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController{

    constructor(
        private userService: UserService,
    ) {}

    @Post()
    async createUser(@Body() userData: CreateUserDto){
        const user = new UserEntity()
        user.email = userData.email
        user.password = userData.password
        user.name = userData.name
        user.id = uuid()

        this.userService.createUser(user);
        return { 
            id : user.id, 
            message: 'user created successfully' 
        };
    }

    @Get()
    async listUsers(@Query('email') email: string){
        
        if(email){
            return await this.userService.retrieveUser('', email);
        }

        const users = await this.userService.listUsers();
        return users;
    }

    @Get('/:id')
    async getUser(@Param() id: string){

        const user = await this.userService.retrieveUser(id);
        return user;
    }

    @Put('/:id')
    async edituser(@Param('id') id: string, @Body() userUpdateData: EditUserDto){
       return await this.userService.editUser(id, userUpdateData) 
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }


}
