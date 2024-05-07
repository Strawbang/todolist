import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CreateRequestUser } from './models/createUser.model';
import { UserServiceInterface } from './user.service.interface';

@Controller()
export class UserController {
  constructor(@Inject(UserServiceInterface) private readonly UserService: UserServiceInterface) {}

  @Get()
  getHello(): string {
   return this.UserService.getHello();
  }
  @Post("/register")
  async handleCreateUser(@Body() createRequestUser: CreateRequestUser, @Res() res: any): Promise<void> {
   try {
      const response = await this.UserService.addUser(createRequestUser)
      return res.status(StatusCodes.OK).send(response);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
   }
  }
}
