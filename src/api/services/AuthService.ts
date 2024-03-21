import jwt from "jsonwebtoken";
import config from "../../config";

const USERNAME = "username";
const PASSWORD = "password";

class AuthService {
  static async login(username: string, password: string) {
    if (username !== USERNAME || password !== PASSWORD) {
      return "invalid credentials";
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
}

export default AuthService;
