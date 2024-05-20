import { User } from '@domain/entities/user.entity';
import { UserRepositoryInterface } from '@domain/interfaces/user.repository.interface';
import { UserServiceInterface } from '@domain/interfaces/user.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async register(username: string, password: string, email: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(username, hashedPassword, email);
  }

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
