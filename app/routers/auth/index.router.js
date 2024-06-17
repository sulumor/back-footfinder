import { Router } from "express";
// -------------- Controllers -----------------
import AuthController from "../../controllers/auth.controller.js";
// -------------- Schemas -----------------
import loginSchema from "../../schemas/post/login.post.schemas.js";
import registrationSchema from "../../schemas/post/registration.post.schemas.js";
// -------------- Middlewares -----------------
import controllerWrapper from "../../helpers/controller.wrapper.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { authenticateToken } from "../../middlewares/jwt.middlewares.js";

const authRouter = Router();

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

authRouter.route("/refresh_token")
/**
 * GET /refresh_token
 * @summary Have a access token from a refresh token cookie
 * @tags Authentification
 * @param { RefreshBody } request.body.required - Refresh token
 * @return { Token } 200 - Success response - application/json
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
  .post(controllerWrapper(AuthController.refreshToken.bind(AuthController)))

/**
 * DELETE /refresh_token
 * @summary Delete the refresh token cookie
 * @tags Authentification
 * @return { Object } 200 - Success response - application/json
 * @return { ApiJsonError } 500 - Internal Server Error response - application/json
 * @example response - 500 - example error response
 * {
 *  "error": "Internal Server Error"
 * }
 */
  .delete(controllerWrapper(AuthController.deleteToken.bind(AuthController)));

/**
 * GET /user
 * @summary Get user information from a token
 * @tags Authentification
 * @return { User } 200 - Success respomse - application/json
 * @return { ApiJsonError } 401 - Unauthorized response - application/json
 * @example response - 401 - example error response
 * {
 *  "error": "Token non disponible"
 * }
 * @return { ApiJsonError } 403 - Forbidden response - application/json
 * @example response - 403 - example error response
 * {
 *  "error": "Forbidden Error"
 * }
 * @return { ApiJsonError } 500 - Internal Server Error response - application/json
 * @example response - 500 - example error response
 * {
 *  "error": "Internal Server Error"
 * }
 */

authRouter.route("/user").get(
  authenticateToken,
  controllerWrapper(AuthController.getUser.bind(AuthController)),
);

export default authRouter;
