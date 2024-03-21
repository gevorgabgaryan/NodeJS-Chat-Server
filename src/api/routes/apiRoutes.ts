import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateCredentials } from "../middlewares/validator";

const apiRoutes = Router();

apiRoutes.post("/auth", validateCredentials, AuthController.login);

export default apiRoutes;
