import { Router } from "express";
import {
  handleGenerateNewShortUrl,
  handleGetAnlaytics,
  handleGetShortUrl,
  handlGetAllShortUrl,
} from "../controller/shortUrlController";

export const router = Router();
router.route("/").get(handlGetAllShortUrl);
router.route("/").post(handleGenerateNewShortUrl);
router.route("/:shortid").get(handleGetShortUrl);
router.route("/analytics/:shortid").get(handleGetAnlaytics);
