import express, { Request, Response, Application } from "express";

import dotenv from "dotenv";
import { router as heyRouter } from "./routes/heyRoute";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ working: true });
});

// dynamic routing
app.use("/api/v1/hey", heyRouter);

// app.listen(port);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} 🚀`);
});
