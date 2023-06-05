"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({
            choices: ["development", "production"],
        }),
        SMARTPROXY_USERNAME: (0, envalid_1.str)(),
        SMARTPROXY_PASSWORD: (0, envalid_1.str)(),
        MONGO_PATH: (0, envalid_1.str)(),
        MONGO_USERNAME: (0, envalid_1.str)(),
        MONGO_PASSWORD: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 3000 }),
        DOMAIN: (0, envalid_1.str)(),
    });
}
exports.default = validateEnv;
