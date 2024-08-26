import { Request, Response } from "express";
import { IUrl, Url } from "../models/urlModel";
import ShortUniqueId = require("short-unique-id");

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
  } catch (error) {}
}

async function handleGenerateNewShortUrl(req: Request, res: Response) {
  try {
    const body: string | undefined = req.body.url;
    if (body === undefined) throw new Error("url empty");
    else {
      const shortId = new ShortUniqueId({ length: 10 });
      await Url.create({
        shortId: shortId.rnd(),
        redirectUrl: body,
        vistHistory: [],
      });

      res.status(201).json({
        message: "Short url created",
      });
    }
  } catch (error) {
    res.status(500);
  }
}

async function handleGetAnlaytics(req: Request, res: Response) {
  try {
    const shortId: string = req.params.shortid;
    const query = await Url.findOne({ shortId: shortId });
    if (query === null) throw new Error("Invalid short Id");
    else
      res.status(200).json({
        totalClicks: query.vistHistory.length,
        analytics: query.vistHistory,
      });
  } catch (error) {}
}

export { handleGetShortUrl, handleGenerateNewShortUrl, handleGetAnlaytics };
