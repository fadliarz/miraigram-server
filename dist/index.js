"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("@/resources/instagram/jsonuser/user.controller"));
const feature_controller_1 = __importDefault(require("@/resources/instagram/feature/feature.controller"));
const validateEnv_1 = __importDefault(require("./utils/validators/validateEnv"));
const cron_1 = __importDefault(require("./utils/classes/cron"));
const cron_test_1 = __importDefault(require("./utils/tests/cron-test"));
// validate environtment
(0, validateEnv_1.default)();
// initialize controllers
const controllers = [
    new user_controller_1.default(),
    new feature_controller_1.default(),
];
// initialize app with the controllers and create server with the app
const app = new app_1.default(controllers, 8000);
const server = (0, http_1.createServer)(app.express);
// initialize cronjob object
const cronJob = new cron_1.default("*/3 * * * * *", cron_test_1.default);
// handle request
app.express.get("/api/v1/login", (req, res) => { });
app.express.get("/", (req, res) => {
    if (cronJob.isRunning) {
        res.send("Cron job is running");
        return;
    }
    res.send("Cron job is disabled");
});
app.express.get("/start", (req, res) => {
    if (cronJob.isRunning) {
        res.send("Cron job is already running");
        return;
    }
    cronJob.start();
    res.send("Cron job is just started");
});
app.express.get("/stop", (req, res) => {
    if (!cronJob.isRunning) {
        res.send("Cron job is already stopped");
        return;
    }
    cronJob.stop();
    res.send("Cron job is just stopped");
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server.listen(process.env.PORT, () => console.log("Server is listening on port", process.env.PORT));
        }
        catch (error) {
            console.log(error);
        }
    });
}
// start the server
start();
