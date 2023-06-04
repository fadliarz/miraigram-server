"use strict";
// import { Request, Response, NextFunction, Router } from "express";
// import HttpException from "@/utils/exceptions/http.exception";
// import Controller from "@/utils/interfaces/controller.interface";
// import InstagramUser from "@/resources/instagram/user/user.model";
// class InstagramUserController implements Controller {
//   private _path = "/api/v1/users";
//   private _router = Router();
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
//     this._router.route("/").get(this.getAll).post(this.create);
//     this._router
//       .route("/:id")
//       .get(this.get)
//       .patch(this.update)
//       .delete(this.delete);
//   }
//   private async getAll(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     try {
//       const instagramDatabases = await InstagramUser.find({});
//       res.status(200).json({ instagramDatabases });
//     } catch (error) {
//       next(new HttpException(400, "Failed fetching databases"));
//     }
//   }
//   private async get(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     try {
//       const { id } = req.params;
//       const instagramDatabase = await InstagramUser.find({ _id: id });
//       res.status(200).json({ instagramDatabase });
//     } catch (error) {
//       next(new HttpException(400, "Failed fetching database"));
//     }
//   }
//   private async create(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     try {
//       const newInstagramDatabase = await InstagramUser.create(req.body);
//       res.status(201).json({ newInstagramDatabase });
//     } catch (error) {
//       next(new HttpException(400, "Failed creating database"));
//     }
//   }
//   private async update(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     try {
//       const { id } = req.params;
//       const updatedInstagramDatabase = await InstagramUser.findOneAndUpdate(
//         {
//           _id: id,
//         },
//         req.body,
//         { runValidators: true }
//       );
//       if (!updatedInstagramDatabase) {
//         next(new HttpException(400, "Database is not found"));
//       }
//       res.status(200).json(updatedInstagramDatabase);
//     } catch (error) {
//       next(new HttpException(400, "Failed updating database"));
//     }
//   }
//   private async delete(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     try {
//       const { id } = req.params;
//       const deletedInstagramDatabase = await InstagramUser.findOneAndDelete({
//         _id: id,
//       });
//       if (!deletedInstagramDatabase) {
//         next(new HttpException(400, "Database is not found"));
//       }
//       res.status(200).json(deletedInstagramDatabase);
//     } catch (error) {
//       next(new HttpException(400, "Failed deleting database"));
//     }
//   }
// }
// export default InstagramUserController;
