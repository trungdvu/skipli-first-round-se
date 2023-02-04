import { Request, Response, Router } from "express";
import { URLSearchParams } from "url";

const githubRoute = Router();

function urlBuilder(base = "", query = {}) {
  return `${base}?${new URLSearchParams(query).toString()}`;
}

githubRoute.get("/search/users", async (req: Request, res: Response) => {
  try {
    const { q, page, per_page } = req.query;

    const usersRes = await fetch(
      urlBuilder("https://api.github.com/search/users", {
        q,
        page,
        per_page,
      })
    );
    const json = await usersRes.json();

    res.status(200).json(json);
  } catch (error) {
    res.json({ error: "Error fetching" });
  }
});

githubRoute.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const json = await userRes.json();

    res.status(200).json(json);
  } catch (error) {
    res.json({ error: "Error fetching" });
  }
});

export { githubRoute };
