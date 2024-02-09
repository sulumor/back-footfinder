import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper";
import AuthController from "../../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", controllerWrapper(AuthController.login.bind(AuthController)));

export default authRouter;