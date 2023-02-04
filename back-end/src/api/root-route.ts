import { Router } from "express";
import { validateAuth } from "../lib/auth-middleware";
import { authRoute } from "./auth-route";
import { githubRoute } from "./github-route";

const rootRoute = Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/github", validateAuth, githubRoute);

export { rootRoute };
