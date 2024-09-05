import { Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import { setAccessToken, setRefreshToken } from "../services/authService";
import bcrypt from "bcryptjs";

async function handleUserSignUp(req: Request, res: Response) {
  const body: IUser = req.body;
  try {
    const foundUser = await User.findOne({ email: body.email });
    if (foundUser === null) {
      const payload = { user: body.email };
      const accessToken: string = setAccessToken(payload);
      const refreshToken: string = setRefreshToken(payload);
      await User.create({ ...body, refreshToken: refreshToken });

      // http cookie is not accessible by js
      res.cookie("uid", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: `User ${body.name} signed up`,
        accessToken,
      });
    } else {
      res.status(409);
      throw new Error(`Email ${body.email} already exist`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      res.json({
        message: error.message,
      });
    }
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
        const payload = { user: query.email };
        const accessToken: string = setAccessToken(payload);
        const refreshToken: string = setRefreshToken(payload);

        await User.findByIdAndUpdate(query._id, { refreshToken: refreshToken });

        // http cookie is not accessible by js
        res.cookie("uid", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          name: query.name,
          accessToken,
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
      res.sendStatus(500);
    }
  }
}

export { handleUserSignUp, handleUserSignIn };
