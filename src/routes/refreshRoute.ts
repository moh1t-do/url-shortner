import { Router } from "express";
import { handlerefreshToken } from "../controller/refreshTokenController";

export const router = Router();

router.route("/").get(handlerefreshToken);
