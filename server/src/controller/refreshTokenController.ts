import dotenv from "dotenv";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt, { Secret } from "jsonwebtoken";
import { setAccessToken } from "../services/authService";

dotenv.config();
const refreshsecret: Secret = process.env.REFRESH_SECRET || '';

async function handlerefreshToken(req: Request, res: Response) {
  const cookies = req.cookies;
  if (!cookies?.uid)
    return res.status(401).json({
      message: "No Cookies avaliable",
    }); // unauth
  const refreshToken = cookies.uid;
  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (foundUser === null)
      return res.status(403).json({
        message: "Invalid token",
      });
    // forbidden
    else {
      jwt.verify(refreshToken, refreshsecret, (err: unknown, decoded: any) => {
        if (err || foundUser.email !== decoded.user)
          return res.status(403).json({
            message: "Token expired",
          });
        const accessToken = setAccessToken({ user: foundUser.email });
        res.status(200).json({ accessToken });
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message,
      });
    else res.sendStatus(500);
  }
}

export { handlerefreshToken };
