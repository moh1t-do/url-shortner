import { Request, Response } from "express";

export const hey = (req: Request, res: Response) => {
  res.status(200).json({ hey: `${req.params.user}` });
};
