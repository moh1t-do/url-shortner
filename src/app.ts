import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// routers
import { router as heyRouter } from "./routes/heyRoute";
import { router as authRouter } from "./routes/authRoute";
import { router as shortUrlRouter } from "./routes/shortUrlRoute";
import { router as refreshRouter } from "./routes/refreshRoute";

// functions
import { connectToDb } from "./connect";
import { verifyJWT } from "./middleware/authMiddleware";

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
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ working: true });
});

// all routes
app.use("/api/v1/hey", verifyJWT, heyRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/refresh", refreshRouter);
app.use("/api/v1/short", verifyJWT, shortUrlRouter);

// app.listen(port);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} 🚀`);
});
