import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const tokenSecret: Secret | undefined = process.env.ACCESS_SECRET;

export interface CustomRequest extends Request {
  user: string | JwtPayload | undefined;
}

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const userUid: string | undefined = req.headers["authorization"];

  if (userUid === undefined) {
    return res.status(401).json({
      message: "User not signed in",
    });
  } else {
    const token = userUid.split("Bearer ")[1];
    if (tokenSecret)
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err)
          if (err instanceof Error)
            return res.status(403).json({
              message: err.message,
            }); // invalid token
        if (typeof (decoded) == "object") {
          (req as CustomRequest).user = decoded.user;
          next();
        }
      });
  }
}

export { verifyJWT };
