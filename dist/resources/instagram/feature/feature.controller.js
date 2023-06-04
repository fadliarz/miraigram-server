"use strict";
// import { Request, Response, NextFunction, Router, response } from "express";
// import axios, {
//   AxiosError,
//   AxiosHeaders,
//   AxiosResponse,
//   AxiosResponseTransformer,
// } from "axios";
// import HttpException from "@/utils/exceptions/http.exception";
// import Controller from "@/utils/interfaces/controller.interface";
// class InstagramFeatureController implements Controller {
//   private _path = "/api/v1/features";
//   private _router = Router();
//   private _apiUrl = "http://instagramapi.fadliarz.com/api";
//   private _endpoints = {
//     comment: "/send_comment",
//     timelinePost: "/get_timeliene_post",
//   };
//   constructor() {
//     this.initialiseRoutes();
//   }
//   public get path() {
//     return this._path;
//   }
//   public get router() {
//     return this._router;
//   }
//   private initialiseRoutes(): void {
//     this._router.route("/sendcomment").post(this.sendComment);
//   }
//   public async sendComment(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     const endpoint = this._endpoints.comment;
//     const sendCommentPayload = req.body;
//     axios
//       .post(this._apiUrl.concat(endpoint), sendCommentPayload)
//       .then((response: AxiosResponse) => {
//         return response.data;
//       })
//       .catch((err) => {
//         return new HttpException(500, err);
//       });
//   }
//   public async getTimelinePosts(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     const endpoint = this._endpoints.timelinePost;
//     const getTimelinePostsPayload = req.body;
//     axios
//       .post(this._apiUrl.concat(endpoint), getTimelinePostsPayload)
//       .then((response: AxiosResponse) => {
//         return response.data;
//       })
//       .catch((err) => {
//         return new HttpException(500, err);
//       });
//   }
//   public async scheduleSendComment(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     const scheduleSendCommentPayLoad = req.body;
//     const userEndpoint = "";
//     const userApiurl = "";
//     const postsEndpoint = "";
//     const postsApiUrl = "";
//     axios
//       .get(userApiurl.concat(userEndpoint))
//       .then((response) => {
//         axios
//           .post(postsApiUrl.concat(postsEndpoint))
//           .then((response) => {})
//           .catch((err) => {
//             return new HttpException(500, err);
//           });
//       })
//       .catch((err) => {
//         return new HttpException(500, err);
//       });
//   }
// }
// export default InstagramFeatureController;
