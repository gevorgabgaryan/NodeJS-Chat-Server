import jwt from 'jsonwebtoken';
import config from '../../config';
import { UnAuthorizedError } from '../../errors/UnAuthorizedError';

const USERNAME = 'username';
const PASSWORD = 'password';

interface JWTPayload {
  username: string;
}

class AuthService {
  static async login(username: string, password: string) {
    if (username !== USERNAME || password !== PASSWORD) {
      throw new UnAuthorizedError();
    }

    const token = jwt.sign(
      {
        username,
      },
      config.JWTSecret,
      {
        expiresIn: config.JWTExpireIn,
      },
    );

    return { token };
  }

  static async checkToken(token: string) {
    try {
      const payload = jwt.verify(token, config.JWTSecret) as JWTPayload;
      const { username } = payload;
      return username;
    } catch (e) {
      throw new UnAuthorizedError();
    }
  }
}

export default AuthService;
