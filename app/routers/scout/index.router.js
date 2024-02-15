/* eslint-disable max-len */
import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import ScoutController from "../../controllers/scout.controller.js";

const scoutRouter = Router();

scoutRouter.route("/:id")
/**
 * GET /scout/:id
 * @summary Get a scout's unformations
 * @tags Scout
 * @param { number } id.path.required - User id
 * @return { Scout } 200 - Success response - application/json
 * @return { ApiJsonError } 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "error: "Bad request"
 * }
 *  @return { ApiJsonError } 404 - Not found response - application/json
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
  .get(controllerWrapper(ScoutController.getWithUser.bind(ScoutController)))
  /**
   * PATCH /scout/:id
   * @summary Update a scout's informations
   * @tags Scout
   * @param { number } id.path.required - User id
   * @param { UpdateScout } request.body.required - Scout's informations to update
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
  .patch(controllerWrapper(ScoutController.updateInfos.bind(ScoutController)));

scoutRouter.route("/search")
  .get(controllerWrapper(ScoutController.getAll.bind(ScoutController)));

scoutRouter.route("/:id/player/:playerId")
/**
 *  * GET /scout/:id/player/:playerId
   * @summary Find one player information
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { FindOnePlayer } request.body.required - Player's informations
   * @return { Player } 200 - Success response - application/json
   * @return { ApiJsonError } 400 - Bad request response - application/json
   * @example response - 400 - example error response
   * {
   *  "error": "Bad request"
   * }
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Player Not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
  .get(controllerWrapper(ScoutController.getFindOnePlayer.bind(ScoutController)));

scoutRouter.route("/:id/player/:playerId/match/:matchId")
/**
 *  * GET/scout/:id/player/:playerId/match/:matchId
   * @summary Find statistics of a player according to a match
   * @tags Player
   * @param { number } id.path.required - User id
   * @param { FindStatsPlayerMatch } request.body.required - Statistics Player information to a match
   * @return { StatsPlayer } 200 - Success response - application/json
   * @return { ApiJsonError } 400 - Bad request response - application/json
   * @example response - 400 - example error response
   * {
   *  "error": "Bad request"
   * }
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Statistics Not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
  .get(controllerWrapper(ScoutController.getFindStatsPlayerMatch.bind(ScoutController)));

export default scoutRouter;
