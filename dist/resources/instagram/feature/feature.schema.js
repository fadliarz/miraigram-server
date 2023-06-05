"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCommentSchema = exports.TimelinePostSchema = exports.CommentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CommentSchema = joi_1.default.object({
    instagram_username: joi_1.default.string().min(4).max(32).required(),
    instagram_password: joi_1.default.string().min(8).max(128).required(),
    comment_id: joi_1.default.number().integer().positive(),
    device_settings: joi_1.default.string().max(512).required(),
    proxy: joi_1.default.string().max(255).required(),
    media_url: joi_1.default.string().max(255).required(),
    comment: joi_1.default.string().max(255).required(),
});
exports.TimelinePostSchema = joi_1.default.object({
    instagram_username: joi_1.default.string().min(4).max(32).required(),
    instagram_password: joi_1.default.string().min(8).max(128).required(),
    device_settings: joi_1.default.string().max(512).required(),
    proxy: joi_1.default.string().max(255),
});
exports.ScheduleCommentSchema = joi_1.default.object({
    instagram_username: joi_1.default.string().min(4).max(32).required(),
    instagram_password: joi_1.default.string().min(8).max(128).required(),
    comment_id: joi_1.default.number().integer().positive(),
    device_settings: joi_1.default.string().max(512).required(),
    proxy: joi_1.default.string().max(255).required(),
    comment: joi_1.default.string().max(255).required(),
    delay: joi_1.default.number().integer().positive().required(),
});
