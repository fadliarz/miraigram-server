import express, { Application } from "express";
// import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Controller from "./utils/interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  private _express: Application;
  private _port: number;

  constructor(controllers: Controller[], port: number) {
    this._express = express();
    this._port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  public get express(): Application {
    return this._express;
  }

  private initialiseDatabaseConnection(): void {
    // const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // mongoose.connect(
    //   `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_PATH}`
    // );
  }

  private initialiseMiddleware(): void {
    this.express.use(compression());
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private initialiseControllers(contollers: Controller[]) {
    contollers.forEach((controller: Controller): void => {
      this.express.use(controller.path, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    this.express.listen(this._port, () => {
      console.log(`App is listening on port ${this._port}`);
    });
  }
}

export default App;
