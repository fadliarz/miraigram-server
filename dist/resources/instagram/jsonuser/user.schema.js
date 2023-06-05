"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramUserValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.InstagramUserValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().required(),
    username: joi_1.default.string().min(4).max(32).required(),
    password: joi_1.default.string().min(8).max(128).required(),
    deviceSetting: joi_1.default.string().max(512).required(),
    proxy: joi_1.default.string().max(255).required(),
});
