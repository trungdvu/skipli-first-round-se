import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserCol } from "../service/firebase";
import { COOKIE_ACCESS_TOKEN, JWT_SECRET } from "../config/variables";

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.[COOKIE_ACCESS_TOKEN];

  if (token) {
    let user: any;

    try {
      const { phoneNumber } = jwt.verify(token, JWT_SECRET) as any;

      const doc = await UserCol.doc(phoneNumber).get();
      user = doc.data();

      if (!user) {
        throw new Error("Not real user");
      }
    } catch (error) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }

    res.locals.user = user;

    return next();
  }

  res.status(401).json({ error: "Not Authorized" });
};
