import Joi from 'joi';

export const credentialsSchema = Joi.object({
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

export const tokenSchema = Joi.string().required();

export const objectIdParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
})
