import { Router } from "express";
import {
  handleGenerateNewShortUrl,
  handleGetAnlaytics,
  handleGetShortUrl,
} from "../controller/shortUrlController";

export const router = Router();
router.route("/").post(handleGenerateNewShortUrl);
router.route("/:shortid").get(handleGetShortUrl);
router.route("/analytics/:shortid").get(handleGetAnlaytics);
