import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      res.promisify!(await AuthService.login(username, password));
    } catch (e) {
      res.promisify!(Promise.reject(e));
    }
  }
}

export default AuthController;
