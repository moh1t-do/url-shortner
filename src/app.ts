import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

// routers
import { router as heyRouter } from "./routes/heyRoute";
import { router as authRouter } from "./routes/authRoute";

// functions
import { connectToDb } from "./connect";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.APP_PORT;
const dbport = process.env.DB_PORT;

// database connection
connectToDb(dbport);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ working: true });
});

// all routes
app.use("/api/v1/hey", heyRouter);
app.use("/api/v1/auth", authRouter);

// app.listen(port);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} 🚀`);
});
