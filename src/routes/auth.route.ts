import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import { errorHandler } from "../../error_handler";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes: Router = Router();

authRoutes.post("/login", errorHandler(controller.login));
authRoutes.post("/signup", errorHandler(controller.signup));
authRoutes.post("/me", authMiddleware, errorHandler(controller.me));

export default authRoutes;
