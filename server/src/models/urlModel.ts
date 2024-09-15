import mongoose, { Schema, model, Model } from "mongoose";

interface IUrl {
  urlTitle: string;
  shortId: string;
  redirectUrl: string;
  visitHistory: number[];
  createdBy: string;
}

const urlSchema = new Schema<IUrl>(
  {
    urlTitle: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: String,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Url: Model<IUrl> = model<IUrl>("Url", urlSchema);
export { Url, IUrl };
