import { Response } from 'express';
import { UnAuthorizedError } from '../../errors/UnAuthorizedError';
import { AppError } from '../../errors/AppError';
import { BaseError } from '../../errors/BaseError';
import logger from '../../lib/logger';
import { NotFoundError } from '../../errors/NotFoundError';

export function responseSender(
  err: any,
  response: Response,
  result?: any,
): void {
  let res: any;
  let statusCode: number = 200;
  if (err) {
    logger.error(err);
    switch (true) {
      case err instanceof NotFoundError:
      case err instanceof BaseError:
      case err instanceof UnAuthorizedError:
        res = err;
        break;
      default:
        res = new AppError(err.message);
        break;
    }
  } else {
    res = result ? result : { status: true };
  }

  response.status(statusCode).json(res);
}
