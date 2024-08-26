import { Router, IRouter } from "express";
import {
  handleUserSignIn,
  handleUserSignUp,
} from "../controller/authController";

const router: IRouter = Router();

router.route("/signup").post(handleUserSignUp);
router.route("/signin").post(handleUserSignIn);

export { router };
