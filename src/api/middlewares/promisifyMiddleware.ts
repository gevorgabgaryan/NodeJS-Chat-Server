import { Request, Response, NextFunction } from 'express';
import { responseSender } from '../helper/ResponseSender';

declare module 'express-serve-static-core' {
  interface Response {
    promisify?: (p: Promise<any> | (() => Promise<any>) | any) => Promise<void>;
  }
}

export const promisifyMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.promisify = (p: Promise<any> | (() => Promise<any>) | any) => {
      let resolvePromise: Promise<any>;
      if (p instanceof Promise) {
        resolvePromise = p;
      } else if (typeof p === 'function') {
        resolvePromise = Promise.resolve().then(() => p());
      } else {
        resolvePromise = Promise.resolve(p);
      }

      return resolvePromise
        .then((data) => responseSender(null, res, data))
        .catch((e) => responseSender(e, res));
    };
    return next();
  };
};
