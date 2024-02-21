import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import AuthController from "../../controllers/auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import loginSchema from "../../schemas/post/login.post.schemas.js";
import registrationSchema from "../../schemas/post/registration.post.schemas.js";
import registerRolePostSchemas from "../../schemas/post/registerRole.post.schemas.js";

const authRouter = Router();

authRouter.post(
  "/register/:role",
  validationMiddleware("params", registerRolePostSchemas),
  controllerWrapper(AuthController.signup.bind(AuthController)),
);
/**
 * POST /login
 * @summary Login user
 * @tags Authentification
 * @param { LoginBody } request.body.required - Login information
 * @return { LoginResponse } 200 - Success response - application/json
 * @return { ApiJsonError } 401 - Unauthorized response - application/json
 * @example response - 401 - example error response
 * {
 *  "error": "Authentification failed"
 * }
 * @return { ApiJsonError } 500 - Internal Server Error response - application/json
 * @example response - 500 - example error response
 * {
 *  "error": "Internal Server Error"
 * }
 */
authRouter.post(
  "/login",
  validationMiddleware("body", loginSchema),
  controllerWrapper(AuthController.login.bind(AuthController)),
);

/**
 * POST /register
 * @summary New user registration
 * @tags Authentification
 * @param { RegisterBody } request.body.required - Registration information
 * @return { RegisterResponse } 201 - Create success - application/json
 * @return { ApiJsonError } 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 *  "error": "Bad request"
 * }
 * @return { ApiJsonError } 500 - Internal Server Error response - application/json
 * @example response - 500 - example error response
 * {
 *  "error": "Internal Server Error"
 * }
 */
authRouter.post(
  "/register",
  validationMiddleware("body", registrationSchema),
  controllerWrapper(AuthController.register.bind(AuthController)),
);

export default authRouter;
