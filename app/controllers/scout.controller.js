/* eslint-disable import/no-cycle */
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.error.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import StatisticsDatamapper from "../datamapper/statistics.datamapper.js";
import FollowDatamapper from "../datamapper/follow.datamapper.js";

/**
 * Controller to manage operations related to scouts.
 */

export default class ScoutController extends CoreController {
  static datamapper = ScoutDatamapper;

  /**
 *Method to search for specifications of a player.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing player information matching the search criteria.
 */
  static async getSearchPlayer({ query }, res, next) {
    const searchPlayer = await PlayerDatamapper.findAll({ where: query });
    if (!searchPlayer) return next(new ApiError("Player with this search not found", { httpStatus: 404 })); // Gérez le cas où le joueur n'est pas trouvé
    return res.status(200).json(searchPlayer);
  }

  static async getAllPlayersMatches({ params }, res, next) {
    const row = await StatisticsDatamapper.findAll({ where: { id: params.id } });
    if (row.length < 1) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(200).json(row);
  }

  static async insertNewFollower({ user, params }, res, next) {
    const row = await FollowDatamapper.insertSQL({ id: user.id, ...params });
    if (!row) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(201).json({ message: "Datas saved" });
  }

  static async unfollowPlayer({ user, params }, res, next) {
    const [data] = await FollowDatamapper.findAll({ where: { player_id: params.playerId } });
    if (!data) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    const deleted = await FollowDatamapper.deleteSQL({ id: user.id, ...params });
    if (!deleted) return next(new ApiError("Datas not deleted", { httpStatus: 404 }));
    return res.status(204).end();
  }
}
