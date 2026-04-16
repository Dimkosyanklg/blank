import { Router } from "express";
import * as userController from "../controllers/user";
import { requireAuth } from "../middleware/requireAuth";

const userRouter = Router();

userRouter.get("/", requireAuth, userController.getCurrentUser);

export default userRouter;
