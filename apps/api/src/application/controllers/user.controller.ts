import { CreateUserDto } from '@application/dtos/createUser.dto';
import { LoginUserDto } from '@application/dtos/loginUser.dto';
import { UserServiceInterface } from '@domain/interfaces/user.service.interface';
import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceInterface)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post('register')
  @ApiResponse({status: StatusCodes.CREATED, description: 'The record has been successfully created.'})
  @ApiResponse({status: StatusCodes.INTERNAL_SERVER_ERROR, description: 'The record has internal server error.'})
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.register(createUserDto.username, createUserDto.password, createUserDto.email);
      return res.status(StatusCodes.CREATED).json({ id: user.id });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }

  @Post('login')
  @ApiResponse({status: StatusCodes.OK, description: 'The record has been successfully login.'})
  @ApiResponse({status: StatusCodes.UNAUTHORIZED, description: 'The record has not authorized.'})
  async login(@Body() loginDto: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.login(loginDto.username, loginDto.password);
      if (user) {
        return res.status(StatusCodes.OK).json({ id: user.id });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
}
