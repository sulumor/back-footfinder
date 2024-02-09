import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import AuthController from "../../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", controllerWrapper(AuthController.login.bind(AuthController)));

export default authRouter;