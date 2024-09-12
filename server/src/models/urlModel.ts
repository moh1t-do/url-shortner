import mongoose, { Schema, model, Model } from "mongoose";

interface IUrl {
  shortId: string;
  redirectUrl: string;
  vistHistory: number[];
  createdBy: string;
}

const urlSchema = new Schema<IUrl>(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    vistHistory: [{ timestamp: { type: Number } }],
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
