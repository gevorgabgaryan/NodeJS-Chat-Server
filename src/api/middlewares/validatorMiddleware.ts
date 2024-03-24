import { Request, Response, NextFunction } from 'express';
import {
  addMessageSchema,
  credentialsSchema,
  getMessagesSchema,
} from '../../lib/validator';

export const validateCredentials = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    return res.status(400).json({ message: 'body required' });
  }
  const { error } = credentialsSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

export const validateGetMessages = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query) {
    return res.status(400).json({ message: 'query required' });
  }
  const { error } = getMessagesSchema.validate(req.query);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

export const validateAddMessage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    return res.status(400).json({ message: 'body required' });
  }
  const { error } = addMessageSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};
