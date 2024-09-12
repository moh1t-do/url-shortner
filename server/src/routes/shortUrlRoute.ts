import { Router } from "express";
import {
  handleGenerateNewShortUrl,
  handleGetAnlaytics,
  handleGetShortUrl,
  handlGetAllShortUrl,
  handleDeleteShortUrl
} from "../controller/shortUrlController";

export const router = Router();
router.route("/").get(handlGetAllShortUrl);
router.route("/").post(handleGenerateNewShortUrl);
router.route("/:shortid").delete(handleDeleteShortUrl);
router.route("/analytics/:shortid").get(handleGetAnlaytics);
