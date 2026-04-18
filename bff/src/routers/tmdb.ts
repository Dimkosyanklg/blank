import { Router } from "express";
import * as tmdbController from "../controllers/tmdb";
import { requireAuth } from "../middleware/requireAuth";

const tmdbRouter = Router();

tmdbRouter.get("/test", requireAuth, tmdbController.testTmdb);

export default tmdbRouter;
