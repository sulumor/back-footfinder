import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import PlayerController from "../../controllers/player.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import patchPlayerSchema from "../../schemas/patch/player.schemas.js";
import idSchemas from "../../schemas/get/id.schemas.js";
import matchPostSchemas from "../../schemas/post/match.post.schemas.js";
import matchPatchSchemas from "../../schemas/patch/match.schemas.js";
import MatchController from "../../controllers/match.controller.js";
import matchIdsSchemas from "../../schemas/patch/matchIds.schemas.js";
import StatisticsController from "../../controllers/statistics.controller.js";
import statisticsPostSchemas from "../../schemas/post/statistics.post.schemas.js";

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
    controllerWrapper(MatchController.updateSQL.bind(MatchController)),
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
    controllerWrapper(PlayerController.getAllMatches.bind(PlayerController)),
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
    controllerWrapper(MatchController.createSQL.bind(MatchController)),
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
    controllerWrapper(PlayerController.getWithUser.bind(PlayerController)),
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
    controllerWrapper(PlayerController.updateAllInfosSQL.bind(PlayerController)),
  );

export default playerRouter;
