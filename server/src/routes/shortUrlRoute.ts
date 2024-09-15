import { Router } from "express";
import {
  handleCreateShortUrl,
  handleGetAnlaytics,
  handlGetAllShortUrl,
  handleDeleteShortUrl
} from "../controller/shortUrlController";

export const router = Router();
router.route("/").get(handlGetAllShortUrl);
router.route("/").post(handleCreateShortUrl);
router.route("/:shortid").delete(handleDeleteShortUrl);
router.route("/analytics/:shortid").get(handleGetAnlaytics);
