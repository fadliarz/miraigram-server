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
const axios_1 = __importDefault(require("axios"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const moment_1 = __importDefault(require("moment"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const feature_schema_1 = require("@/resources/instagram/feature/feature.schema");
const validateBody_1 = __importDefault(require("@/utils/validators/validateBody"));
const login_setting_class_1 = __importDefault(require("@/utils/classes/login-setting.class"));
class InstagramFeatureController {
    constructor() {
        this._path = "/api/v1/features";
        this._router = (0, express_1.Router)();
        this._endpoints = {
            comment: "/send_comment",
            timelinePosts: "/get_timeline_posts",
        };
        this._instagramApi = {
            domain: "",
            path: {
                comment: "/send_comment",
                timelinePost: "/get_timeline_posts",
            },
        };
        this._domain = process.env.DOMAIN + this._path;
        this.initialiseRoutes();
    }
    get path() {
        return this._path;
    }
    get router() {
        return this._router;
    }
    initialiseRoutes() {
        this._router.route("/send_comment").post(this._sendComment);
        this._router.route("/get_timeline_posts").post(this._getTimelinePosts);
        this._router.route("/schedule_comment").post(this._scheduleComment);
        this._router.route("/get_login_settings").get(this._getLoginSettings);
    }
    _sendComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateBody_1.default)(req, res, next, feature_schema_1.CommentSchema);
            const sendCommentPayload = req.body;
            const endpoint = this._instagramApi.domain.concat(this._instagramApi.path.comment);
            axios_1.default
                .post(endpoint, sendCommentPayload)
                .then((response) => {
                return response.data;
            })
                .catch((err) => {
                next(new http_exception_1.default(500, "Failed sending comment"));
            });
        });
    }
    _getTimelinePosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateBody_1.default)(req, res, next, feature_schema_1.TimelinePostSchema);
            try {
                const getTimelinePostsPayload = req.body;
                const endpoint = this._instagramApi.domain.concat(this._instagramApi.path.timelinePost);
                axios_1.default
                    .post(endpoint, getTimelinePostsPayload)
                    .then((response) => {
                    return response.data;
                })
                    .catch((err) => {
                    next(new http_exception_1.default(500, "Failed fetching timeline posts"));
                });
            }
            catch (error) {
                next(new http_exception_1.default(500, "Failed fetching timeline posts"));
            }
        });
    }
    _scheduleComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateBody_1.default)(req, res, next, feature_schema_1.ScheduleCommentSchema);
            try {
                const payload = req.body;
                const endpoints = {
                    timelinePosts: this._domain.concat(this._endpoints.timelinePosts),
                    comment: this._domain.concat(this._endpoints.comment),
                };
                axios_1.default
                    .post(endpoints.timelinePosts, payload)
                    .then((response) => {
                    const posts = response.data.posts;
                    posts.forEach((post) => {
                        const timeTaken = 5; // time since posted, in minutes
                        // handle when the time taken is larger
                        if (timeTaken > payload.delay) {
                            return;
                        }
                        // assign the real post url to the payload
                        payload.media_url = post.url;
                        // configure the schedule date
                        const scheduleDate = (0, moment_1.default)(new Date())
                            .add(payload.delay - timeTaken, "m")
                            .toDate();
                        // scheduled function
                        const scheduleCallback = () => {
                            axios_1.default
                                .post(endpoints.comment, payload)
                                .then((response) => {
                                return res.status(200).json(response.data);
                            })
                                .catch((err) => {
                                next(new http_exception_1.default(500, "Failed scheduling comment"));
                            });
                        };
                        // schedule task
                        node_schedule_1.default.scheduleJob(scheduleDate, scheduleCallback);
                    });
                })
                    .catch((err) => {
                    next(new http_exception_1.default(500, "Failed scheduling comment"));
                });
            }
            catch (error) {
                next(new http_exception_1.default(500, "Failed scheduling comment"));
            }
        });
    }
    _getLoginSettings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginSettings = new login_setting_class_1.default();
                res.status(200).json({
                    status: "success",
                    settings: {
                        device_settings: loginSettings.deviceSettings,
                        proxy: loginSettings.proxy,
                        user_agent: loginSettings.userAgent,
                    },
                });
            }
            catch (error) {
                next(new http_exception_1.default(500, "Failed generating login settings"));
            }
        });
    }
}
exports.default = InstagramFeatureController;
