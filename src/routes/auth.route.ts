import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { errorHandler } from "../../error_handler";

const authRoutes: Router = Router();

authRoutes.post("/login", errorHandler(login));
authRoutes.post("/signup", errorHandler(signup));

export default authRoutes;
