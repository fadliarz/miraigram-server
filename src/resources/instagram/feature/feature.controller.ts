import { Request, Response, NextFunction, Router, response } from "express";
import axios, { AxiosResponse } from "axios";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import moment from "moment";
import schedule from "node-schedule";
import {
  CommentSchema,
  ScheduleCommentSchema,
  TimelinePostSchema,
} from "@/resources/instagram/feature/feature.schema";
import validateBody from "@/utils/validators/validateBody";
import LoginSetting from "@/utils/classes/login-setting.class";

class InstagramFeatureController implements Controller {
  private _path = "/api/v1/features";
  private _router = Router();
  private _endpoints = {
    comment: "/send_comment",
    timelinePosts: "/get_timeline_posts",
  };
  private _instagramApi = {
    domain: "",
    path: {
      comment: "/send_comment",
      timelinePost: "/get_timeline_posts",
    },
  };
  private _domain = process.env.DOMAIN + this._path;

  constructor() {
    this.initialiseRoutes();
  }

  public get path() {
    return this._path;
  }

  public get router() {
    return this._router;
  }

  private initialiseRoutes(): void {
    this._router.route("/send_comment").post(this._sendComment);
    this._router.route("/get_timeline_posts").post(this._getTimelinePosts);
    this._router.route("/schedule_comment").post(this._scheduleComment);
    this._router.route("/get_login_settings").get(this._getLoginSettings);
  }

  private async _sendComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    validateBody(req, res, next, CommentSchema);

    const sendCommentPayload = req.body;

    const endpoint = this._instagramApi.domain.concat(
      this._instagramApi.path.comment
    );

    axios
      .post(endpoint, sendCommentPayload)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((err) => {
        next(new HttpException(500, "Failed sending comment"));
      });
  }

  private async _getTimelinePosts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    validateBody(req, res, next, TimelinePostSchema);

    try {
      const getTimelinePostsPayload = req.body;

      const endpoint = this._instagramApi.domain.concat(
        this._instagramApi.path.timelinePost
      );

      axios
        .post(endpoint, getTimelinePostsPayload)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((err) => {
          next(new HttpException(500, "Failed fetching timeline posts"));
        });
    } catch (error) {
      next(new HttpException(500, "Failed fetching timeline posts"));
    }
  }

  private async _scheduleComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    validateBody(req, res, next, ScheduleCommentSchema);

    try {
      const payload: any = req.body;

      const endpoints = {
        timelinePosts: this._domain.concat(this._endpoints.timelinePosts),
        comment: this._domain.concat(this._endpoints.comment),
      };

      axios
        .post(endpoints.timelinePosts, payload)
        .then((response) => {
          const posts: { url: string }[] = response.data.posts;

          posts.forEach((post) => {
            const timeTaken = 5; // time since posted, in minutes

            // handle when the time taken is larger
            if (timeTaken > payload.delay) {
              return;
            }

            // assign the real post url to the payload
            payload.media_url = post.url;

            // configure the schedule date
            const scheduleDate = moment(new Date())
              .add(payload.delay - timeTaken, "m")
              .toDate();

            // scheduled function
            const scheduleCallback = () => {
              axios
                .post(endpoints.comment, payload)
                .then((response) => {
                  return res.status(200).json(response.data);
                })
                .catch((err) => {
                  next(new HttpException(500, "Failed scheduling comment"));
                });
            };

            // schedule task
            schedule.scheduleJob(scheduleDate, scheduleCallback);
          });
        })
        .catch((err) => {
          next(new HttpException(500, "Failed scheduling comment"));
        });
    } catch (error) {
      next(new HttpException(500, "Failed scheduling comment"));
    }
  }

  private async _getLoginSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loginSettings = new LoginSetting();

      res.status(200).json({
        status: "success",
        settings: {
          device_settings: loginSettings.deviceSettings,
          proxy: loginSettings.proxy,
          user_agent: loginSettings.userAgent,
        },
      });
    } catch (error) {
      next(new HttpException(500, "Failed generating login settings"));
    }
  }
}

export default InstagramFeatureController;
