import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const credentialsSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});

export const getMessagesSchema = Joi.object({
  page: Joi.number().required(),
  itemsPerPage: Joi.number().required().max(100),
  keyword: Joi.string().max(100),
});

export const addMessageSchema = Joi.object({
  message: Joi.string().required().max(300),
});

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
