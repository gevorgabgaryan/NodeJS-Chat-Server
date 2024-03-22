import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await AuthService.login(username, password);
      res.status(200).json({
        token,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'System error',
      });
    }
  }
}

export default AuthController;
