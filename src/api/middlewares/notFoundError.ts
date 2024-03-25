import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../errors/NotFoundError';

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!res.headersSent) {
    res.promisify!(new NotFoundError());
  } else {
    next();
  }
}
