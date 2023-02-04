import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rootRoute } from "./api/root-route";
import { APP_PORT, APP_VERSION } from "./config/app-config";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(`/${APP_VERSION}`, rootRoute);

app.listen(APP_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${APP_PORT}`);
});
