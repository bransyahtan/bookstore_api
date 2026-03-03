import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.number().integer().required(),
  isbn: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  stock: Joi.number().integer().min(0).required(),
  publishedDate: Joi.date().iso().allow(null),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  authorId: Joi.number().integer(),
  isbn: Joi.string(),
  price: Joi.number().precision(2),
  stock: Joi.number().integer().min(0),
  publishedDate: Joi.date().iso().allow(null),
}).min(1);
