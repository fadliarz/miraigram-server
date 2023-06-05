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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validateBody_1 = __importDefault(require("@/utils/validators/validateBody"));
const user_schema_1 = require("@/resources/instagram/jsonuser/user.schema");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const uuid_1 = require("uuid");
class InstagramUserController {
    constructor() {
        this._path = "/api/v1/users";
        this._router = (0, express_1.Router)();
        this.initialiseRoutes();
    }
    get path() {
        return this._path;
    }
    get router() {
        return this._router;
    }
    initialiseRoutes() {
        this._router.route("/").get(this._getAll).post(this._create);
        this._router.route("/:id").get(this._get).delete(this._delete);
    }
    _getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = JSON.parse(fs_1.default.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8")).users;
                res.status(200).json({ status: "success", users });
            }
            catch (error) {
                next(new http_exception_1.default(500, "Failed fetching databases"));
            }
        });
    }
    _get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = JSON.parse(fs_1.default.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8"));
                const { id } = req.params;
                db.users.filter((user) => {
                    return user.id === id;
                });
                const instagramDatabase = db.users.filter((user) => {
                    return user.id === id;
                });
                if (instagramDatabase.length === 0) {
                    res.status(404).json({ status: "failed", msg: "User not found" });
                    return;
                }
                res.status(200).json({ status: "success", user: instagramDatabase[0] });
            }
            catch (error) {
                next(new http_exception_1.default(500, "Failed fetching database"));
            }
        });
    }
    _create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateBody_1.default)(req, res, next, user_schema_1.InstagramUserValidationSchema);
            const db = JSON.parse(fs_1.default.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8"));
            try {
                const userWithSameUserId = db.users.filter((user) => {
                    return user.userId === req.body.userId;
                });
                if (userWithSameUserId.length !== 0) {
                    next(new http_exception_1.default(400, "User is already exist"));
                    return;
                }
                const payload = {
                    id: (0, uuid_1.v4)(),
                    userId: req.body.userId,
                    username: req.body.username,
                    password: req.body.password,
                    createdAt: new Date(),
                    lastActivity: new Date(),
                    deviceSetting: req.body.deviceSetting,
                    isActive: true,
                };
                const newInstagramDatabase = payload;
                db.users.push(newInstagramDatabase);
                yield util_1.default.promisify(fs_1.default.writeFile)("./src/resources/instagram/jsonuser/db.json", JSON.stringify(db));
                res.status(201).json({ status: "success", user: newInstagramDatabase });
            }
            catch (error) {
                console.error("Error:", error);
                next(new http_exception_1.default(500, "Failed creating database"));
            }
        });
    }
    _delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const db = JSON.parse(fs_1.default.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8"));
                const newUsers = db.users.filter((user) => {
                    return user.id !== id;
                });
                if (newUsers.length === db.users.length) {
                    res.status(404).json({ status: "failed", msg: "User not found" });
                    return;
                }
                db.users = newUsers;
                yield util_1.default.promisify(fs_1.default.writeFile)("./src/resources/instagram/jsonuser/db.json", JSON.stringify(db));
                res.status(200).json({
                    status: "success",
                    msg: util_1.default.format("Deleted user with id {}", id),
                });
            }
            catch (error) {
                console.error(error);
                next(new http_exception_1.default(500, "Failed deleting database"));
            }
        });
    }
}
exports.default = InstagramUserController;
