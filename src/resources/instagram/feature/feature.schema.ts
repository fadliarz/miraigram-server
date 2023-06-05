import Joi from "joi";

export const CommentSchema = Joi.object({
  instagram_username: Joi.string().min(4).max(32).required(),
  instagram_password: Joi.string().min(8).max(128).required(),
  comment_id: Joi.number().integer().positive(),
  device_settings: Joi.string().max(512).required(),
  proxy: Joi.string().max(255).required(),
  media_url: Joi.string().max(255).required(),
  comment: Joi.string().max(255).required(),
});

export const TimelinePostSchema = Joi.object({
  instagram_username: Joi.string().min(4).max(32).required(),
  instagram_password: Joi.string().min(8).max(128).required(),
  device_settings: Joi.string().max(512).required(),
  proxy: Joi.string().max(255),
});

export const ScheduleCommentSchema = Joi.object({
  instagram_username: Joi.string().min(4).max(32).required(),
  instagram_password: Joi.string().min(8).max(128).required(),
  comment_id: Joi.number().integer().positive(),
  device_settings: Joi.string().max(512).required(),
  proxy: Joi.string().max(255).required(),
  comment: Joi.string().max(255).required(),
  delay: Joi.number().integer().positive().required(),
});
