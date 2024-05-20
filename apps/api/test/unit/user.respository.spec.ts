import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

// Mock for the Mongoose Model
const mockUserModel = () => ({
  findOne: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  create: jest.fn(),
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: ReturnType<typeof mockUserModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel(),
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userModel = module.get(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findByUsername', () => {
    it('should return a user if found', async () => {
      const user = { username: 'testuser', password: 'testpass' };
      userModel.exec.mockResolvedValue(user);

      const result = await userRepository.findByUsername('testuser');
      expect(result).toEqual(user);
      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should return null if no user is found', async () => {
      userModel.exec.mockResolvedValue(null);

      const result = await userRepository.findByUsername('nonexistentuser');
      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'nonexistentuser' });
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const user = { username: 'newuser', password: 'newpass' };
      const createdUser = { ...user, save: jest.fn().mockResolvedValue(user) };
      userModel.create.mockReturnValue(createdUser);

      const result = await userRepository.createUser('newuser', 'newpass');
      expect(result).toEqual(user);
      expect(userModel.create).toHaveBeenCalledWith({ username: 'newuser', password: 'newpass' });
      expect(createdUser.save).toHaveBeenCalled();
    });
  });
});
