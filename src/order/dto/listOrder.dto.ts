import { ListUserDto } from "src/user/dto/listUser.dto";

export class ListOrderDto {
    
    constructor(
        readonly id: string,
        readonly totalAmount: number,
        readonly status: string,
        readonly createdAt: string,
        readonly user: ListUserDto
    ) {}
}

