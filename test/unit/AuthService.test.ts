import AuthService from '../../src/api/services/AuthService';
import { UnAuthorizedError } from '../../src/errors/UnAuthorizedError';

describe('AuthService', () => {
  it('should return a token for valid credentials', async () => {
    const token = await AuthService.login('username', 'password');
    expect(token).toBeDefined();
  });

  it('should throw an error for invalid credentials', async () => {
    await expect(AuthService.login('wrong', 'credentials')).rejects.toThrow(
      UnAuthorizedError,
    );
  });

  it('should validate a token successfully', async () => {
    const data = await AuthService.login('username', 'password');
    const username = await AuthService.checkToken(data.token);
    expect(username).toBe('username');
  });

  it('should throw an error for an invalid token', async () => {
    await expect(AuthService.checkToken('invalid-token')).rejects.toThrow();
  });
});
