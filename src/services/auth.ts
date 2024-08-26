import jwt, { Secret, JwtPayload, Jwt } from "jsonwebtoken";
import { IUser } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

const secret: Secret = "mohitmohit";

interface CustomRequest extends Request {
  user: string;
}

async function restrictToLoggedinuserOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userUid: string | undefined = req.cookies.uid;

  if (userUid === undefined) {
    return res.status(401).json({
      message: "User not signed in",
    });
  } else {
    const user = getUser(userUid);
    (req as CustomRequest).user = JSON.stringify(user);
    next();
  }
}

function setUser(user: IUser) {
  const payload: JwtPayload | string = user.email;
  return jwt.sign(payload, secret);
}

function getUser(token: string) {
  return jwt.verify(token, secret);
}

export { setUser, getUser, restrictToLoggedinuserOnly };
