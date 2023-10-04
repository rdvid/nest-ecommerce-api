import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserDatabase } from "src/user/user.database";

@Controller('/users')
export class UserController{

    constructor(private userDatabase: UserDatabase) {}

    @Post()
    async createUser(@Body() userData: CreateUserDto){
        this.userDatabase.saveUser(userData);
        return userData;
    }

    @Get()
    async listUsers(){
        return this.userDatabase.listUsers();
    }

    @Get('/:id')
    async listUser(@Param() id: string, @Query() name: string){
        return id
    }

}
