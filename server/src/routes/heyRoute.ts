import { Router } from "express";
import { hey } from "../controller/heyController";

export const router = Router();

router.route("/:user").get(hey);
