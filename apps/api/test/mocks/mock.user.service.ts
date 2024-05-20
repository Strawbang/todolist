import { UserServiceInterface } from '../../src/domain/interfaces/user.service.interface';

export const mockUserService: Partial<UserServiceInterface> = {
  register: jest.fn().mockImplementation((username: string, password: string) => {
    return { id: '1', username, password };
  }),
  login: jest.fn().mockImplementation((username: string, password: string) => {
    if (username === 'testuser' && password === 'testpassword') {
      return { id: '1', username, password };
    }
    return null;
  }),
};
