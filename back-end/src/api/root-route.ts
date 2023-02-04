import { Router } from "express";
import { validateAuth } from "../lib/auth-middleware";
import { authRoute } from "./auth-route";
import { githubRoute } from "./github-route";
import { usersRoute } from "./users-route";

const rootRoute = Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/github", validateAuth, githubRoute);
rootRoute.use("/users", validateAuth, usersRoute);

export { rootRoute };
