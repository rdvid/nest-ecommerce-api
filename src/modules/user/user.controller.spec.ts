import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { ListUserDto } from "./dto/listUser.dto";

const UserEntityList: UserEntity[] = [
    new UserEntity({
        id: 'mockuuid1',
        name: 'mockeruser1',
        email: 'mockeduser1@email.com',
        password: 'somepasswordhash',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
        deletedAt: "",
    }),
    new UserEntity({
        id: 'mockuuid2',
        name: 'mockeruser2',
        email: 'mockeduser2@email.com',
        password: 'somepasswordhash',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
        deletedAt: "",
    }),
    new UserEntity({
        id: 'mockuuid3',
        name: 'mockeruser3',
        email: 'mockeduser3@email.com',
        password: 'somepasswordhash',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
        deletedAt: "",
    })
];

const newUserListDto: ListUserDto = {
    email: UserEntityList[0].email,
    id: UserEntityList[0].id,
    name: UserEntityList[0].name,
};

describe('User Controller', () => {
    let userController: UserController;
    let userService: UserService;
    let configService: ConfigService;

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        listUsers: jest.fn().mockResolvedValue(UserEntityList),
                        createUser: jest.fn().mockResolvedValue(newUserListDto),
                        retrieveUser: jest.fn(),
                        editUser: jest.fn(),
                        deleteUser: jest.fn()
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    }
                },  
            ],
        }).compile();
        userService = module.get<UserService>(UserService);
        configService = module.get<ConfigService>(ConfigService);
        userController = module.get<UserController>(UserController);
    });

    it('should be defined', ()=>{
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
        expect(configService).toBeDefined();
    });

    describe('list users', () => {

        it('should list all users', async () => {
            let userList = await userController.listUsers();
            expect(userList).toBe(UserEntityList);
            expect(userService.listUsers).toHaveBeenCalledTimes(1);
        });
    
        it('should get error', async ()=> {
            jest.spyOn(userService, 'listUsers').mockRejectedValueOnce(new Error());
            expect(userService.listUsers()).rejects.toThrowError();
        });

    });

    describe('create new user', () => {

        it('should create a new user', async () => {

            const body: CreateUserDto = {
                name: 'mockeruser1',
                email: 'mockeduser1@email.com',
                password: 'somepasswordhash',
            };
            
            const response = await userController.createUser(body, body.password);
            
            expect(response.message).toBe("user created successfully");
            expect(response.user).toMatchObject(newUserListDto);
            
        });

    });

})