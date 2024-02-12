import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import PlayerController from "../../controllers/player.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import patchPlayerSchema from "../../schemas/patch/player.schemas.js";
import idSchemas from "../../schemas/get/id.schemas.js";

const playerRouter = Router();

playerRouter.route("/:id")
  /**
   * GET /player/:id
   * @summary Get a player's informations
   * @tags Player
   * @param { number } id.path.required - User id
   * @return { Player } 200 - Success response - application/json
   * @return { ApiJsonError } 400 - Bad request response - application/json
   * @example response - 400 - example error response
   * {
   *  "error": "Bad request"
   * }
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
  .get(
    validationMiddleware("params", idSchemas),
    controllerWrapper(PlayerController.getByPk.bind(PlayerController)))

  /**
   * PATCH /player/:id
   * @summary Update a player's informations
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { UpdatePlayer } request.body.required - Player's informations to update
   * @return { Player } 200 - Success response - application/json
   * @return { ApiJsonError } 400 - Bad request response - application/json
   * @example response - 400 - example error response
   * {
   *  "error": "Bad request"
   * }
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
  .patch(
    validationMiddleware("params", idSchemas),
    validationMiddleware("body", patchPlayerSchema),
    controllerWrapper(PlayerController.update.bind(PlayerController))
  );

export default playerRouter;
