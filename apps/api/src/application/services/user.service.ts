import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/interfaces/user.repository.interface';
import { UserServiceInterface } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async register(username: string, password: string): Promise<User> {
    return this.userRepository.createUser(username, password);
  }

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
