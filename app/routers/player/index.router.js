import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import PlayerController from "../../controllers/player.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import patchPlayerSchema from "../../schemas/patch/player.patch.schemas.js";
import idSchemas from "../../schemas/get/id.schemas.js";
import matchPostSchemas from "../../schemas/post/match.post.schemas.js";
import matchPatchSchemas from "../../schemas/patch/match.patch.schemas.js";
import MatchController from "../../controllers/match.controller.js";
import matchIdsSchemas from "../../schemas/patch/matchIds.patch.schemas.js";
import StatisticsController from "../../controllers/statistics.controller.js";
import statisticsPostSchemas from "../../schemas/post/statistics.post.schemas.js";
import statisticsPatchSchemas from "../../schemas/patch/statistics.patch.schemas.js";

const playerRouter = Router();

playerRouter.route("/:id/match/:matchId/stats")
  /**
   * GET /player/:id/match/:matchId/stats
   * @summary Get one match statistics
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
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
    validationMiddleware("params", matchIdsSchemas),
    controllerWrapper(StatisticsController.getOneMatchStats.bind(StatisticsController)),
  )
  /**
   * POST /player/:id/match/:matchId/stats
   * @summary Add statistics in one match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
   * @param { PostStats } request.body.required - Stats
   *  to add in one match
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
  .post(
    validationMiddleware("params", matchIdsSchemas),
    validationMiddleware("body", statisticsPostSchemas),
    controllerWrapper(StatisticsController.postOneMatchStats.bind(StatisticsController)),
  )
  /**
   * PATCH /player/:id/match/:matchId/stats
   * @summary Update statistics in one match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
   * @param { PostStats } request.body.required - Stats
   *  to update in one match
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
    controllerWrapper(StatisticsController.updateOneMatchStats.bind(StatisticsController)),
  )
  /**
   * DELETE /player/:id/match/:matchId/stats
   * @summary Delete statistics in one match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
   * @return {} 204 - Success response
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
    validationMiddleware("params", matchIdsSchemas),
    controllerWrapper(StatisticsController.deleteOneMatchStats.bind(StatisticsController)),
  );
playerRouter.route("/:id/match/stats")
  /**
     * GET /player/:id/match/stats
     * @summary Get all one player's statistics
     * @tags Player
     * @param { number } id.path.required - User id
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
    validationMiddleware("params", idSchemas),
    controllerWrapper(StatisticsController.getStatsByPlayer.bind(StatisticsController)),
  );

playerRouter.route("/:id/match/:matchId")
  /**
     * GET /player/:id/match/:matchId
     * @summary Get one player's match
     * @tags Player
     * @param { number } id.path.required - User id
     * @param { number } matchId.path.required - Match id
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
  .get(
    validationMiddleware("params", matchIdsSchemas),
    controllerWrapper(MatchController.getOneMatchByUserId.bind(MatchController)),
  )
  /**
   * PATCH /player/:id/match/:matchId
   * @summary Update one match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { number } matchId.path.required - Match id
   * @param { PostMatch } request.body.required - Match information
   *  to update one minimum is required
   * @return { Match } 200 - Success response - application/json
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
    validationMiddleware("body", matchPatchSchemas),
    controllerWrapper(MatchController.updateMatch.bind(MatchController)),
  );

playerRouter.route("/:id/stats")
  .get(
    validationMiddleware("params", idSchemas),
    controllerWrapper(StatisticsController.getGlobalStats.bind(StatisticsController)),
  );

playerRouter.route("/:id/match")
  /**
   * GET /player/:id/match
   * @summary Get all player's matches
   * @tags Player
   * @param { number } id.path.required - User id
   * @return { Match[] } 200 - Success response - aplication/json
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
    controllerWrapper(MatchController.getAllMatchesByUserId.bind(MatchController)),
  )
  /**
   * POST /player/:id/match
   * @summary Post a new match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { PostMatch } request.body.required - Match informations to create
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
    validationMiddleware("params", idSchemas),
    validationMiddleware("body", matchPostSchemas),
    controllerWrapper(MatchController.createMatch.bind(MatchController)),
  );
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
    controllerWrapper(PlayerController.getAllInfos.bind(PlayerController)),
  )

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
    controllerWrapper(PlayerController.updateSQL.bind(PlayerController)),
  );

export default playerRouter;
