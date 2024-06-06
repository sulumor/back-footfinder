import MatchDatamapper from "../datamapper/match.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import TeamController from "./team.controller.js";
/**
 * Controller to manage operations related to matches.
 */
export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  /**
   *Method to get all matches associated with a user ID.
   * @param {Object} param0 The request Object.
   * @param {Object} res The response object
   * @param {Function} next the next middleware
   * @returns {Object} Response containing all matches for user
   */
  static async getAllMatchesByUserId({ params }, res, next) {
    const matches = await this.datamapper.findAll({ where: { id: params.id } });
    if (!matches[0]) return next(new ApiError("No match found for this player", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matches);
    return res.status(200).json(results);
  }
  /**
 * Method to get a specific match by user ID and match ID.
 * @param {*Object} req The request Object.
 * @param {Object} res The response object
 * @param {Function} next the next middleware
 * @returns {Object} Response containing the specific match information
 */

  static async getOneMatchByUserId({ params }, res, next) {
    const data = { id: params.id, match_id: params.matchId };
    const matches = await this.datamapper.findAll({ where: data });
    if (!matches[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matches);
    return res.status(200).json(results[0]);
  }
}
