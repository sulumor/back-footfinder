import StatisticsDatamapper from "../datamapper/statistics.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import TeamController from "./team.controller.js";

/**
 * Controller to manage operations related to statistics.
 */
export default class StatisticsController extends CoreController {
  static datamapper = StatisticsDatamapper;

  /**
   * Method to retrieve global statistics
   * @param {Object} param0 The request object.
   * @param {Object} res The response object
   * @param {Function} next The next middleware.
   * @returns {Object} Response containing global statistics.
   */
  static async getGlobalStats({ user }, res, next) {
    const globalStats = await this.datamapper.getGlobalStats(user.id);
    if (!globalStats) return next(new ApiError("No statistics found", { httpStatus: 404 }));
    return res.status(200).json(globalStats);
  }

  /**
 *Method to retrieve statistics for a specific match.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing statistics for the match.
 */
  static async getOneMatchStats({ params }, res, next) {
    const matchStats = await this.datamapper.findAll({
      where: { id: params.id, match_id: params.matchId },
    });
    if (!matchStats[0]) return next(new ApiError("No stats found", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matchStats);
    return res.status(200).json(results);
  }
}
