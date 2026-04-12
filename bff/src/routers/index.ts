import { Router } from "express";
import * as healthController from "../controllers/health";
import authRouter from "./auth";
import githubModelsRouter from "./githubModels";

const apiRouter = Router();

apiRouter.get("/health", healthController.healthCheck);
apiRouter.use("/auth", authRouter);
apiRouter.use("/github-models", githubModelsRouter);

export default apiRouter;
