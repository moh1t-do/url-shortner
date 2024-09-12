import { Request, Response } from "express";
import { Url } from "../models/urlModel";
import ShortUniqueId = require("short-unique-id");
import { CustomRequest } from "../middleware/authMiddleware";

async function handleGetShortUrl(req: Request, res: Response) {
  try {
    const shortId: string = req.params.shortid;
    const query = await Url.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          vistHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (query === null) throw new Error("Invalid short Id");
    else res.redirect(query.redirectUrl);
  } catch (error) { }
}

async function handlGetAllShortUrl(req: Request, res: Response) {
  const user = (req as CustomRequest).user;
  try {
    const allUrls = await Url.find({ createdBy: user }).sort({ createdAt: -1 });
    res.status(200).json({
      allUrls,
    });
  } catch (error) { }
}

async function handleDeleteShortUrl(req: Request, res: Response) {
  try {
    const shortId: string = req.params.shortid;
    if (shortId === undefined) throw new Error("url empty");
    else {
      await Url.findByIdAndDelete(shortId);

      res.status(200).json({
        message: "Short url deleted",
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

async function handleGenerateNewShortUrl(req: Request, res: Response) {
  try {
    const body: string | undefined = req.body.url;
    const user = (req as CustomRequest).user;
    if (body === undefined) throw new Error("url empty");
    else {
      const shortId = new ShortUniqueId({ length: 10 });
      const rshortId = shortId.rnd();
      await Url.create({
        shortId: rshortId,
        redirectUrl: body,
        vistHistory: [],
        createdBy: user,
      });

      res.status(201).json({
        message: "Short url created",
        shortId: rshortId,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

async function handleGetAnlaytics(req: Request, res: Response) {
  try {
    const shortId: string = req.params.shortid;
    const query = await Url.findOne({ shortId: shortId });
    if (query === undefined || query === null)
      throw new Error("Invalid short Id");
    else
      res.status(200).json({
        totalClicks: query.vistHistory.length,
        analytics: query.vistHistory,
      });
  } catch (error) { }
}

export {
  handleGetShortUrl,
  handlGetAllShortUrl,
  handleGenerateNewShortUrl,
  handleDeleteShortUrl,
  handleGetAnlaytics,
};
