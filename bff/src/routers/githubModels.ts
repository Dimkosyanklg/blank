import { Router } from "express";
import * as githubModelsController from "../controllers/githubModels";

const githubModelsRouter = Router();

githubModelsRouter.post("/test", githubModelsController.testGithubModels);

export default githubModelsRouter;
