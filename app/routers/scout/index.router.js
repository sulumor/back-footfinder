import { Router } from "express";
// -------------- Controllers -----------------
import ScoutController from "../../controllers/scout.controller.js";
import FollowController from "../../controllers/follow.controller.js";
import StatisticsController from "../../controllers/statistics.controller.js";
// -------------- Schemas -----------------
import getPlayerIdSchemas from "../../schemas/get/playerId.get.schemas.js";
import searchGetSchemas from "../../schemas/get/search.get.schemas.js";
import patchScoutSchemas from "../../schemas/patch/scout.patch.schemas.js";
import idSchemas from "../../schemas/get/id.schemas.js";
// -------------- Middlewares -----------------
import validationMiddleware from "../../middlewares/validation.middleware.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import { authenticateToken, authorizationRoute } from "../../middlewares/jwt.middlewares.js";

const scoutRouter = Router();

scoutRouter.use(authenticateToken);
scoutRouter.use(authorizationRoute);

scoutRouter.route("/search")
  /**
   * GET /scout/search
   * @summary Find players with filters
   * @tags Scout
   * @param { PlayerQuery } request.query.required - Filter
   * @return { Player[] } 200 - Success response - application/json
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
    validationMiddleware("query", searchGetSchemas),
    controllerWrapper(ScoutController.getSearchPlayer.bind(ScoutController)),
  );

scoutRouter.route("/player/:id/match")
  /**
   * GET scout/player/:id/match/stats
   * @summary Get all player's matches with statistics
   * @tags Scout
   * @param { number } id.path.required - Player's id
   * @return { Stats } 200 - Success response - application/json
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
    controllerWrapper(ScoutController.getAllPlayersMatches.bind(ScoutController)),
  );

/**
 * GET /scout/player/:id/stats
 * @summary Global average statistics of one player by id
 * @tags Scout
 * @param { number } id.path.required - Player's id
 * @return { Stats } 200 - Success response - application/json
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
scoutRouter.route("/player/:id/stats")
  .get(
    validationMiddleware("params", idSchemas),
    controllerWrapper(StatisticsController.getGlobalPlayerStats.bind(StatisticsController)),
  );

scoutRouter.route("/player/:playerId")
  /**
     * POST /scout/player/:id
     * @summary Follow a player
     * @tags Scout
     * @param { number } playerId.path.required - Player's id
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
  .post(
    validationMiddleware("params", getPlayerIdSchemas),
    controllerWrapper(ScoutController.insertNewFollower.bind(FollowController)),
  )
  /**
   * DELETE /scout/player/:id
   * @summary Unfollow one player
   * @tags Scout
   * @param { number } playerId.path.required - Player's id
   * @return {} 204 - Success response - application/json
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
  .delete(
    validationMiddleware("params", getPlayerIdSchemas),
    controllerWrapper(ScoutController.unfollowPlayer.bind(ScoutController)),
  );

scoutRouter.route("/")
  /**
   * GET /scout
   * @summary Get scout's informations
   * @tags Scout
   * @return { Scout } 200 - Success response - application/json
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
    controllerWrapper(ScoutController.getByPk.bind(ScoutController)),
  )
  /**
   * PATCH /scout
   * @summary Update scout's informations
   * @tags Scout
   * @param { UpdateScout } request.body.required - Scout's informations to update
   * @return { Scout } 200 - Success response - application/json
   *  @return { ApiJsonError } 400 - Bad request response - application/json
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
    validationMiddleware("body", patchScoutSchemas),
    controllerWrapper(ScoutController.update.bind(ScoutController)),
  );

export default scoutRouter;
