"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
class App {
    constructor(controllers, port) {
        this._express = (0, express_1.default)();
        this._port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    get express() {
        return this._express;
    }
    initialiseDatabaseConnection() {
        // const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PATH } = process.env;
        // mongoose.connect(
        //   `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_PATH}`
        // );
    }
    initialiseMiddleware() {
        this.express.use((0, compression_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, helmet_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    }
    initialiseControllers(contollers) {
        contollers.forEach((controller) => {
            this.express.use(controller.path, controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    listen() {
        this.express.listen(this._port, () => {
            console.log(`App is listening on port ${this._port}`);
        });
    }
}
exports.default = App;
