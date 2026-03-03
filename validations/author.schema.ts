import Joi from "joi";

export const authorSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().allow("", null),
});

export const updateAuthorSchema = Joi.object({
  name: Joi.string(),
  bio: Joi.string().allow("", null),
}).min(1);
