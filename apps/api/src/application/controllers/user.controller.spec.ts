import { Test, TestingModule } from '@nestjs/testing';
import { mockUserService } from '../../../test/mocks/mock.user.service';
import { UserController } from '../controllers/user.controller';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import { CreateRequestUser } from '../models/createUser.model';
import { LoginRequestUser } from '../models/loginUser.model';

describe('UserController', () => {
let userController: UserController;
let userService: UserServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceInterface,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserServiceInterface>(UserServiceInterface);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateRequestUser = { username: 'testuser', password: 'testpassword' };
      const result = await userController.register(createUserDto);
      expect(result).toEqual({ id: '1' });
      expect(userService.register).toHaveBeenCalledWith(createUserDto.username, createUserDto.password);
    });
  });

  describe('login', () => {
    it('should login a user with valid credentials', async () => {
      const loginDto: LoginRequestUser = { username: 'testuser', password: 'testpassword' };
      const result = await userController.login(loginDto);
      expect(result).toEqual({ id: '1' });
      expect(userService.login).toHaveBeenCalledWith(loginDto.username, loginDto.password);
    });

    it('should return an error message for invalid credentials', async () => {
      const loginDto: LoginRequestUser = { username: 'invaliduser', password: 'invalidpassword' };
      const result = await userController.login(loginDto);
      expect(result).toEqual({ message: 'Invalid credentials' });
      expect(userService.login).toHaveBeenCalledWith(loginDto.username, loginDto.password);
    });
  });
});
