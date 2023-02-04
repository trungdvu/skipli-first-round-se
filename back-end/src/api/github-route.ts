import { Request, Response, Router } from "express";

const githubRoute = Router();

githubRoute.get("/", async (req: Request, res: Response) => {
  res.json({ data: "Hello From Github route" });
});

export { githubRoute };
