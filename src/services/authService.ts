import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

dotenv.config();
const accesssecret: Secret = process.env.ACCESS_JWT_SECRET || "accesstest";
const refreshsecret: Secret = process.env.REFRESH_JWT_SECRET || "refreshtest";

function setAccessToken(payload: JwtPayload) {
  const res = jwt.sign(payload, accesssecret, { expiresIn: "5m" });
  return res;
}

function setRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, refreshsecret, { expiresIn: "1d" });
}

export { setAccessToken, setRefreshToken };
