import "dotenv/config";
import "module-alias/register";
import { createServer } from "http";
import { Request, Response } from "express";
import App from "./app";
import Controller from "@/utils/interfaces/controller.interface";
// import InstagramUserController from "@/resources/instagram/user/user.controller";
// import InstagramFeatureController from "@/resources/instagram/feature/feature.controller";
import validateEnv from "./utils/validateEnv";
import Cron from "@/utils/classes/cron";
import updateCounter from "@/utils/cron-test";

// validate environtment
validateEnv();

// initialize controllers
// const controllers: Controller[] = [
//   new InstagramUserController(),
//   new InstagramFeatureController(),
// ];
const controllers: Controller[] = [];

// initialize app with the controllers and create server with the app
const app = new App(controllers, 8000);
const server = createServer(app.express);

// initialize cronjob object
const cronJob = new Cron("*/3 * * * * *", updateCounter);

// handle request
app.express.get("/api/v1/login", (req: Request, res: Response) => {});
app.express.get("/", (req: Request, res: Response) => {
  if (cronJob.isRunning) {
    res.send("Cron job is running");

    return;
  }

  res.send("Cron job is disabled");
});
app.express.get("/start", (req: Request, res: Response) => {
  if (cronJob.isRunning) {
    res.send("Cron job is already running");

    return;
  }

  cronJob.start();

  res.send("Cron job is just started");
});
app.express.get("/stop", (req: Request, res: Response) => {
  if (!cronJob.isRunning) {
    res.send("Cron job is already stopped");

    return;
  }

  cronJob.stop();

  res.send("Cron job is just stopped");
});

async function start(): Promise<void> {
  try {
    server.listen(8000, () => console.log(`Server is listening on port 8000`));
  } catch (error) {
    console.log(error);
  }
}

// start the server
start();
