"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
class Cron {
    constructor(field, callback) {
        this._isRunning = true;
        this._task = node_cron_1.default.schedule(field, callback);
        this._field = field;
        this._callback = callback;
    }
    get isRunning() {
        return this._isRunning;
    }
    get field() {
        return this._field;
    }
    start() {
        if (this._isRunning) {
            return this._isRunning;
        }
        this._isRunning = !this._isRunning;
        this._task = node_cron_1.default.schedule(this._field, this._callback);
        return this._isRunning;
    }
    stop() {
        if (!this._isRunning) {
            return this._isRunning;
        }
        this._isRunning = !this._isRunning;
        this._task.stop();
        return this._isRunning;
    }
}
exports.default = Cron;
