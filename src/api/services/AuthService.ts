import jwt from 'jsonwebtoken';
import config from '../../config';

const USERNAME = 'username';
const PASSWORD = 'password';

interface JWTPayload {
  username: string;
}

class AuthService {
  static async login(username: string, password: string) {
    if (username !== USERNAME || password !== PASSWORD) {
      return 'invalid credentials';
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

    return token;
  }

  static async checkToken(token: string) {
    try {
      const payload = jwt.verify(token, config.JWTSecret) as JWTPayload;
      const { username } = payload;

      return username;
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
}

export default AuthService;
