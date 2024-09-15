import { Request, Response } from "express";
import { Url } from "../models/urlModel"

async function handleRedirectUrl(req: Request, res: Response) {
    try {
        const shortId: string = req.params.shortid;
        const query = await Url.findOneAndUpdate(
            { shortId: shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if (query === null) throw new Error("Invalid short Id");
        else res.redirect(query.redirectUrl);
    } catch (error) { }
}

export { handleRedirectUrl };