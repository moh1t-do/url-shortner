import { Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import { setUser } from "../services/auth";
import bcrypt from "bcryptjs";

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
      res.status(409);
      throw new Error(`Email ${body.email} already exist`);
    }
  } catch (error) {
    if (error instanceof Error)
      res.json({
        message: error.message,
      });
  }
}

async function handleUserSignIn(req: Request, res: Response) {
  const body: IUser = req.body;
  try {
    const query = await User.findOne({ email: body.email });
    if (query === null) {
      res.status(404);
      throw new Error("Email not found");
    } else {
      const isMatch = bcrypt.compareSync(body.password, query.password);

      if (isMatch) {
        const token: string = setUser(body);
        res.cookie("uid", token);
        res.status(200).json({
          message: `User ${body.name} signed in`,
        });
      } else {
        res.status(409);
        throw new Error("Password is not correct");
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.json({ error: error.message });
    } else {
      console.log("Unexpected error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { handleUserSignUp, handleUserSignIn };
