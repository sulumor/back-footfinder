import { Router } from "express";
// -------------- Controllers -----------------
import AuthController from "../../controllers/auth.controller.js";
// -------------- Schemas -----------------
import loginSchema from "../../schemas/post/login.post.schemas.js";
import registrationSchema from "../../schemas/post/registration.post.schemas.js";
import registerRolePostSchemas from "../../schemas/post/registerRole.post.schemas.js";
// -------------- Middlewares -----------------
import controllerWrapper from "../../helpers/controller.wrapper.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import validationRegistrationMiddleware from "../../middlewares/validation.registration.middleware.js";

const authRouter = Router();

/**
 * POST /register/:role
 * @summary New player|scout registration
 * @tags Authentification
 * @param { string } role.params.required - Role of the user to be register (joueur|recruteur)
 * @param { RegisterPlayerBody|RegisterScoutBody } request.body.required - Registration information
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
  "/register/:role",
  validationMiddleware("params", registerRolePostSchemas),
  validationRegistrationMiddleware(),
  controllerWrapper(AuthController.signup.bind(AuthController)),
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

export default authRouter;
