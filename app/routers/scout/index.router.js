import { Router } from "express";
// -------------- Controllers -----------------
import ScoutController from "../../controllers/scout.controller.js";
import PlayerController from "../../controllers/player.controller.js";
import MatchController from "../../controllers/match.controller.js";
import FollowController from "../../controllers/follow.controller.js";
import StatisticsController from "../../controllers/statistics.controller.js";
// -------------- Schemas -----------------
import idSchemas from "../../schemas/get/id.schemas.js";
import scoutIdsGetSchemas from "../../schemas/get/scoutIds.get.schemas.js";
import scoutPlayerMatchIdsGetSchemas from "../../schemas/get/scoutPlayerMatchIds.get.schemas.js";
import searchGetSchemas from "../../schemas/get/search.get.schemas.js";
import scoutPatchSchemas from "../../schemas/patch/scout.patch.schemas.js";
// -------------- Middlewares -----------------
import validationMiddleware from "../../middlewares/validation.middleware.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import { authenticateToken } from "../../middlewares/jwt.middlewares.js";

const scoutRouter = Router();

scoutRouter.route("/search")
  /**
   * GET /scout/search
   * @summary Find players with search filters
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
    authenticateToken,
    validationMiddleware("query", searchGetSchemas),
    controllerWrapper(ScoutController.getSearchSpecificationPlayer.bind(ScoutController)),
  );

scoutRouter.route("/:scoutId/player/:id/match/:matchId/stats")
  /**
   * GET scout/:scoutId/player/:id/match/:matchId/stats
   * @summary Get one match statistics
   * @tags Scout
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
   * @param { number } scoutId.path.required - Scout id
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
  .get(controllerWrapper(StatisticsController.getOneMatchStats.bind(StatisticsController)));

scoutRouter.route("/:scoutId/player/:id/match/:matchId")
  /**
  * GET /scout/:scoutId/player/:id/match/:matchId
  * @summary Find one match of one player
  * @tags Scout
  * @param { number } id.path.required - User id
  * @param { number } scoutId.path.required - Scout id
  * @param { number } matchId.path.required - Match id
  * @return { Match[] } 200 - Success response - application/json
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
    authenticateToken,
    validationMiddleware("params", scoutPlayerMatchIdsGetSchemas),
    controllerWrapper(MatchController.getOneMatchByUserId.bind(MatchController)),
  );

scoutRouter.route("/:scoutId/player/:id/stats")
  .get(
    validationMiddleware("params", scoutIdsGetSchemas),
    controllerWrapper(StatisticsController.getGlobalStats.bind(StatisticsController)),
  );

scoutRouter.route("/:scoutId/player/:id/match")
  /**
    * GET /scout/:scoutId/player/:id/match
    * @summary Find all match of one player
    * @tags Scout
    * @param { number } id.path.required - User id
    * @param { number } scoutId.path.required - Scout id
    * @return { Match[] } 200 - Success response - application/json
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
    validationMiddleware("params", scoutIdsGetSchemas),
    controllerWrapper(MatchController.getAllMatchesByUserId.bind(MatchController)),
  );

scoutRouter.route("/:scoutId/player/:id")
  /**
   * GET /scout/:scoutId/player/:id
   * @summary Find one player information
   * @tags Scout
   * @param { number } id.path.required - User id
   * @param { number } scoutId.path.required - Scout id
   * @param { FindOnePlayer } request.query.required - Player's informations
   * @return { Player } 200 - Success response - application/json
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
  .get(
    authenticateToken,
    validationMiddleware("params", scoutIdsGetSchemas),
    controllerWrapper(PlayerController.getAllInfos.bind(PlayerController)),
  )
  /**
     * POST /scout/:scoutId/player/:id
     * @summary Insert player in scout's follow list
     * @tags Scout
     * @param { number } scoutId.path.required - User id
     * @param { number } playerId.path.required - Player id
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
    validationMiddleware("params", scoutIdsGetSchemas),
    controllerWrapper(FollowController.insertPlayerFollow.bind(FollowController)),
  )
  /**
   * DELETE /scout/:scoutId/player/:id
   * @summary Delete one player in scout's follow list
   * @tags Scout
   * @param { number } id.path.required - User id
   * @param { number } scoutId.path.required - Scout id
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
    validationMiddleware("params", scoutIdsGetSchemas),
    controllerWrapper(FollowController.deletePlayerFollow.bind(FollowController)),
  );

scoutRouter.route("/:id")
  /**
   * GET /scout/:id
   * @summary Get a scout's informations
   * @tags Scout
   * @param { number } id.path.required - User id
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
    validationMiddleware("params", idSchemas),
    controllerWrapper(ScoutController.getAllInfos.bind(ScoutController)),
  )
  /**
   * PATCH /scout/:id
   * @summary Update a scout's informations
   * @tags Scout
   * @param { number } id.path.required - User id
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
    validationMiddleware("params", idSchemas),
    validationMiddleware("body", scoutPatchSchemas),
    controllerWrapper(ScoutController.updateSQL.bind(ScoutController)),
  );

export default scoutRouter;
