import Joi from "joi";

export const InstagramUserValidationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  username: Joi.string().min(4).max(32).required(),
  password: Joi.string().min(8).max(128).required(),
  deviceSetting: Joi.string().max(512).required(),
  proxy: Joi.string().max(255).required(),
});
