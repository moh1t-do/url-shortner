import { Request, Response } from "express";
import { User, IUser } from "../models/userModel";

async function handleUserSignUp(req: Request, res: Response) {
  const body: IUser = req.body;
  try {
    const foundUser = await User.findOne({ email: body.email });
    if (foundUser === null) {
      await User.create(body);
      res.status(201).json({
        message: `User ${body.name} signed up`,
      });
    } else {
      res.status(409).json({
        message: `Email ${body.email} already exist`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

async function handleUserSignIn(req: Request, res: Response) {
  const body: IUser = req.body;
  try {
    const query = await User.findOne({ email: body.email });
    if (query === null) {
      res.status(409).json({
        message: `Email ${body.email} not signed up`,
      });
    } else {
      res.status(200).json({
        message: `User ${body.name} signed in`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

export { handleUserSignUp, handleUserSignIn };
