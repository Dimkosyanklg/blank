import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./routers/index";

dotenv.config();

const app = express();
const port = process.env.PORT || "8080";
const corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN || "*";
const corsOrigin =
  !corsAllowedOrigin || corsAllowedOrigin === "*"
    ? true
    : corsAllowedOrigin;

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", apiRouter);

app.use("/api", (_req: Request, res: Response) => {
  res.status(404).json({ message: "not found" });
});

const bootstrap = async () => {
  const uri = (process.env.MONGODB_URI || "").trim();
  if (!uri) {
    console.error("MONGODB_URI is not set");
    process.exit(1);
  }

  const dbName = process.env.MONGODB_DB_NAME?.trim();
  try {
    await mongoose.connect(uri, dbName ? { dbName } : undefined);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`BFF started on :${port}`);
  });
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
