import PlayDatampper from "../datamapper/play.datamapper.js";
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
   * Method to retrieve statistics for a player
   * @param {Object} req  The request object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object}  Response containing statistics for the player.
   */

  static async getStatsByPlayer({ params }, res, next) {
    const stats = await this.datamapper.findAll({ where: { id: params.id } });
    if (!stats) return next(new ApiError("Ressource not found", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(stats);
    return res.status(200).json(results);
  }

  /**
   * Method to retrieve global statistics
   * @param {Object} param0 The request object.
   * @param {Object} res The response object
   * @param {Function} next The next middleware.
   * @returns {Object} Response containing global statistics.
   */
  static async getGlobalStats({ params }, res, next) {
    const globalStats = await this.datamapper.getGlobalStats(params.id);
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
    if (!matchStats[0]) return next(new ApiError("No match Found", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matchStats);
    return res.status(200).json(results);
  }

  /**
 *Method to create statistics for a specific match
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing created statistics for the match.
 */
  static async postOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.insertSQL(data);
    const results = await TeamController.getHomeAndAwayTeamsInfos(stats);
    return res.status(201).json(results);
  }

  /**
 *Method to update statistics for a specific match.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing updated statistics for the match.
 */
  static async updateOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });

    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.updateSQL(data);
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(stats);
    return res.status(201).json(results);
  }

  /**
 *Method to delete statistics for a specific match.
 * @param {Object} param0 The request object
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response indicating successful deletion of statistics for the match.
 */
  static async deleteOneMatchStats({ params }, res, next) {
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const deleted = await this.datamapper.delete(params);
    if (!deleted) return next(new ApiError("No stats found", { httpStatus: 404 }));
    return res.status(204).end();
  }
}
