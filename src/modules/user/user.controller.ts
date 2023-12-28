import { Body, Controller, Get, Param, Post, Query, Put, Delete } from "@nestjs/common";
import { CreateUserDto } from "src/modules/user/dto/createUser.dto";
import { EditUserDto } from "src/modules/user/dto/editUser.dto";
import { UserService } from "src/modules/user/user.service";
import { HashPasswordPipe } from "../../resources/pipes/hashPassword.pipe";
import { ListUserDto } from "./dto/listUser.dto";

@Controller('/users')
export class UserController{

    constructor(
        private userService: UserService,
    ) {}

    @Post()
    async createUser(
        @Body() { password, ...userData }: CreateUserDto, 
        @Body('password', HashPasswordPipe) hashedPassword: string
    ){

        const newUser = await this.userService.createUser({
            password: hashedPassword, 
            ...userData, 
        });

        const newUserDto = new ListUserDto(newUser.id, newUser.name, newUser.email)

        return {
            message: 'user created successfully',
            user: newUserDto
        }
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
