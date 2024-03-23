import AuthService from '../../src/api/services/AuthService';

describe('AuthService', () => {
  it('should return a token for valid credentials', async () => {
    const token = await AuthService.login('username', 'password');
    expect(token).toBeDefined();
  });

  it('should return an error for invalid credentials', async () => {
    const result = await AuthService.login('wrong', 'credentials');
    expect(result).toBe('invalid credentials');
  });

  it('should validate a token successfully', async () => {
    const token = await AuthService.login('username', 'password');
    const username = await AuthService.checkToken(token);
    expect(username).toBe('username');
  });

  it('should throw an error for an invalid token', async () => {
    await expect(AuthService.checkToken('invalid-token')).rejects.toThrow();
  });
});
