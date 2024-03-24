import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

declare module 'express-serve-static-core' {
  interface Request {
    username?: string;
  }
}

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization;

    if (Array.isArray(token)) {
      token = token[0];
    }

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const authToken = token.split(' ')[1];
    const username = await AuthService.checkToken(authToken);

    if (!username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.username = username;

    next();
  } catch (e) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
