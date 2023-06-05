import { Request, Response, NextFunction, Router } from "express";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import validateBody from "@/utils/validators/validateBody";
import { InstagramUserValidationSchema } from "@/resources/instagram/jsonuser/user.schema";
import fs from "fs";
import util from "util";
import InstagramUser from "./user.interface";
import { v4 as uuidv4 } from "uuid";

class InstagramUserController implements Controller {
  private _path = "/api/v1/users";
  private _router = Router();

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
    this._router.route("/").get(this._getAll).post(this._create);
    this._router.route("/:id").get(this._get).delete(this._delete);
  }

  private async _getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = JSON.parse(
        fs.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8")
      ).users;

      res.status(200).json({ status: "success", users });
    } catch (error) {
      next(new HttpException(500, "Failed fetching databases"));
    }
  }

  private async _get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const db = JSON.parse(
        fs.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8")
      ) as { users: InstagramUser[] };

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
    } catch (error) {
      next(new HttpException(500, "Failed fetching database"));
    }
  }

  private async _create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    validateBody(req, res, next, InstagramUserValidationSchema);
    const db = JSON.parse(
      fs.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8")
    ) as { users: InstagramUser[] };

    try {
      const userWithSameUserId = db.users.filter((user) => {
        return user.userId === req.body.userId;
      });

      if (userWithSameUserId.length !== 0) {
        next(new HttpException(400, "User is already exist"));

        return;
      }

      const payload: InstagramUser = {
        id: uuidv4(),
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

      await util.promisify(fs.writeFile)(
        "./src/resources/instagram/jsonuser/db.json",
        JSON.stringify(db)
      );

      res.status(201).json({ status: "success", user: newInstagramDatabase });
    } catch (error) {
      console.error("Error:", error);
      next(new HttpException(500, "Failed creating database"));
    }
  }

  private async _delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      const db = JSON.parse(
        fs.readFileSync("./src/resources/instagram/jsonuser/db.json", "utf-8")
      ) as { users: InstagramUser[] };

      const newUsers = db.users.filter((user) => {
        return user.id !== id;
      });

      if (newUsers.length === db.users.length) {
        res.status(404).json({ status: "failed", msg: "User not found" });

        return;
      }

      db.users = newUsers;

      await util.promisify(fs.writeFile)(
        "./src/resources/instagram/jsonuser/db.json",
        JSON.stringify(db)
      );

      res.status(200).json({
        status: "success",
        msg: util.format("Deleted user with id {}", id),
      });
    } catch (error) {
      console.error(error);
      next(new HttpException(500, "Failed deleting database"));
    }
  }
}

export default InstagramUserController;
