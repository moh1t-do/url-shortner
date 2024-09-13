import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

dotenv.config();
const tokenSecret: Secret | undefined = process.env.ACCESS_SECRET;
const refreshsecret: Secret | undefined = process.env.REFRESH_SECRET;

function setAccessToken(payload: JwtPayload) {
  if (tokenSecret)
    return jwt.sign(payload, tokenSecret, { expiresIn: "1d" });
}

function setRefreshToken(payload: JwtPayload) {
  if (refreshsecret)
    return jwt.sign(payload, refreshsecret, { expiresIn: "1d" });
}

export { setAccessToken, setRefreshToken };
