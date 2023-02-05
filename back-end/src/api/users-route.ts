import { Router, Response, Request } from "express";
import { UserCol } from "../service/firebase";

const usersRoute = Router();

usersRoute.post(
  "/:phoneNumber/favorite-github",
  async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.params;
      const { githubUsername } = req.query;

      const { favoriteGithubUsers = [] } = res.locals.user;
      let newFavoriteGithubUsers = [...favoriteGithubUsers];

      if (favoriteGithubUsers.includes(githubUsername)) {
        newFavoriteGithubUsers = favoriteGithubUsers.filter(
          (username: string) => username !== githubUsername
        );
      } else {
        newFavoriteGithubUsers.push(githubUsername);
      }

      await UserCol.doc(phoneNumber).update({
        favoriteGithubUsers: newFavoriteGithubUsers,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

usersRoute.get("/:phoneNumber", async (_: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, data: res.locals.user });
  } catch (error) {
    res.json({ success: false });
  }
});

export { usersRoute };
