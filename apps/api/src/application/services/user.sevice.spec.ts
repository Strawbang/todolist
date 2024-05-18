import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/interfaces/user.repository.interface';
import { UserService } from './user.service';

// Mock User Repository
const mockUserRepository = {
  createUser: jest.fn(),
  findByUsername: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositoryInterface,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepositoryInterface>(UserRepositoryInterface);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const username = 'testuser';
      const password = 'testpass';
      const user = new User('1', username, password);

      mockUserRepository.createUser.mockResolvedValue(user);

      const result = await userService.register(username, password);

      expect(userRepository.createUser).toHaveBeenCalledWith(username, password);
      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return user if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'testpass';
      const user = new User('1', username, password);

      mockUserRepository.findByUsername.mockResolvedValue(user);

      const result = await userService.login(username, password);

      expect(userRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toEqual(user);
    });

    it('should return null if credentials are invalid', async () => {
      const username = 'testuser';
      const password = 'wrongpass';
      const user = new User('1', username, 'testpass');

      mockUserRepository.findByUsername.mockResolvedValue(user);

      const result = await userService.login(username, password);

      expect(userRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toBeNull();
    });

    it('should return null if user is not found', async () => {
      const username = 'nonexistentuser';
      const password = 'testpass';

      mockUserRepository.findByUsername.mockResolvedValue(null);

      const result = await userService.login(username, password);

      expect(userRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toBeNull();
    });
  });
});
