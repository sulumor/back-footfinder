import { Router } from "express";
// -------------- Controllers -----------------
import PlayerController from "../../controllers/player.controller.js";
import MatchController from "../../controllers/match.controller.js";
import StatisticsController from "../../controllers/statistics.controller.js";
// -------------- Schemas -----------------
import matchPostSchemas from "../../schemas/post/match.post.schemas.js";
import patchPlayerSchema from "../../schemas/patch/player.patch.schemas.js";
import matchIdsSchemas from "../../schemas/patch/matchIds.patch.schemas.js";
import statisticsPatchSchemas from "../../schemas/patch/statistics.patch.schemas.js";
// -------------- Middlewares -----------------
import controllerWrapper from "../../helpers/controller.wrapper.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { authenticateToken, authorizationRoute } from "../../middlewares/jwt.middlewares.js";
import idSchemas from "../../schemas/get/id.schemas.js";

const playerRouter = Router();

playerRouter.use(authenticateToken);
playerRouter.use(authorizationRoute);

playerRouter.route("/match/stats")
/**
 * GET /player/match/stats
     * @summary Get player's matches with statistics
     * @tags Player
     * @return { Stats[] } 200 - Success response - application/json
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
    controllerWrapper(StatisticsController.getByPk.bind(StatisticsController)),
  );

playerRouter.route("/match/:matchId")
  /**
   * PATCH /player/match/:matchId
   * @summary Update one match's statistics by his id
   * @tags Player
   * @param { number } matchId.path.required - Match's id
   * @param { PostStats } request.body.required - Object with new statistics
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
  .patch(
    validationMiddleware("params", matchIdsSchemas),
    validationMiddleware("body", statisticsPatchSchemas),
    controllerWrapper(StatisticsController.update.bind(StatisticsController)),
  );

playerRouter.route("/match/:id")
  /**
   * DELETE /player/match/:matchId
   * @summary Delete one match by his Id
   * @tags Player
   * @param { number } id.path.required - Match's id
   * @return { } 204 - Success response - application/json
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
    validationMiddleware("params", idSchemas),
    controllerWrapper(MatchController.delete.bind(MatchController)),
  );

playerRouter.route("/stats")
  /**
   * GET /player/stats
   * @summary Get player's average statistics
   * @tags Player
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
    controllerWrapper(StatisticsController.getGlobalStats.bind(StatisticsController)),
  );

playerRouter.route("/match")
  /**
   * POST /player/match
   * @summary Post a new match
   * @tags Player
   * @param { PostMatch } request.body.required - Object with match's informations
   * @return { Match } 200 - Success response - aplication/json
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
    validationMiddleware("body", matchPostSchemas),
    controllerWrapper(MatchController.insert.bind(MatchController)),
  );

playerRouter.route("/")
  /**
   * GET /player
   * @summary Get player's informations
   * @tags Player
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
    controllerWrapper(PlayerController.getByPk.bind(PlayerController)),
  )

  /**
   * PATCH /player
   * @summary Update player's informations
   * @tags Player
   * @param { UpdatePlayer } request.body.required - Object with new player's information
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
    validationMiddleware("body", patchPlayerSchema),
    controllerWrapper(PlayerController.update.bind(PlayerController)),
  );

export default playerRouter;
