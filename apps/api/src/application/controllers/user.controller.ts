import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import { CreateRequestUser } from '../models/createUser.model';
import { LoginRequestUser } from '../models/loginUser.model';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceInterface)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post('register')
  async register(@Body() CreateRequestUser: CreateRequestUser) {
    const user = await this.userService.register(CreateRequestUser.username, CreateRequestUser.password);
    return { id: user.id };
  }

  @Post('login')
  async login(@Body() loginDto: LoginRequestUser) {
    const user = await this.userService.login(loginDto.username, loginDto.password);
    if (user) {
      return { id: user.id };
    }
    return { message: 'Invalid credentials' };
  }
}
