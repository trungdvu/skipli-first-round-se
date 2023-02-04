import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { UserCol } from "../service/firebase";
import { generateAccessCode } from "../util/helpers";
import { COOKIE_ACCESS_TOKEN, JWT_SECRET } from "../config/variables";
import { twilioClient, messagingServiceSid } from "../service/twilio";

const authRoute = Router();

authRoute.post(
  "/access-code/:phoneNumber",
  async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.params;
      const accessCode = generateAccessCode();

      await UserCol.doc(phoneNumber).set({ accessCode });

      twilioClient.messages
        .create({
          messagingServiceSid,
          to: phoneNumber,
          body: `Skipli frist round se Verify Code: ${accessCode}`,
        })
        .then((message) => console.log(`[SMS]:`, message.sid))
        .catch((err) => console.log(`[SMS]:`, err));

      res.status(201).json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

authRoute.post(
  "/access-code/:phoneNumber/validation",
  async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.params;
      const { accessCode } = req.query;

      const doc = await UserCol.doc(phoneNumber).get();

      const user = doc.data();

      if (accessCode == user.accessCode) {
        await UserCol.doc(phoneNumber).set({ accessCode: "" });

        const token = jwt.sign(
          {
            phoneNumber,
            accessCode,
            time: Date.now(),
          },
          JWT_SECRET,
          { expiresIn: "8h" }
        );

        res.setHeader(
          "Set-Cookie",
          cookie.serialize(COOKIE_ACCESS_TOKEN, token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        );

        res.status(200).json({ success: true });
        return;
      }

      res.status(404).json({ success: false });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

export { authRoute };
