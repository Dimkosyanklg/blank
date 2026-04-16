import { Router } from "express";
import * as githubModelsController from "../controllers/githubModels";
import { requireAuth } from "../middleware/requireAuth";

const githubModelsRouter = Router();

githubModelsRouter.post("/test", requireAuth, githubModelsController.testGithubModels);

export default githubModelsRouter;
