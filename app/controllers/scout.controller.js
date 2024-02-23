/* eslint-disable import/no-cycle */
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.error.js";
import PlayerController from "./player.controller.js";
import TeamController from "./team.controller.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";

/**
 * Controller to manage operations related to scouts.
 */

export default class ScoutController extends CoreController {
  static datamapper = ScoutDatamapper;

  /**
 *Method to retrieve information for multiple scouts.
 * @param {number[]} scoutId Array of scout IDs.
 * @returns {Promise<Object[]>} Promise resolving to an array of scout information objects.
 */
  static async getScoutInfos(scoutId) {
    const allScoutPromises = [];
    scoutId.forEach((id) => {
      const scoutPromise = this.datamapper.findAll({ where: { scout_id: id } });
      allScoutPromises.push(scoutPromise);
    });
    return (await Promise.all(allScoutPromises)).map((scout) => scout[0]);
  }

  /**
 *Method to get all information for a scout.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware
 * @returns Response containing all scout information along with associated player information.
 */
  static async getAllInfos({ params }, res, next) {
    const scout = await this.datamapper.findAll({ where: { id: params.id } });
    if (!scout[0]) return next(new ApiError("No scout found", { httpStatus: 404 }));
    let data = "Pas de joueur suivi";
    if (scout[0].player_id[0] !== null) {
      const playersInfos = await PlayerController.getPlayerInfos(scout[0].player_id);
      const teamPromises = [];
      playersInfos.forEach((player) => {
        const teamPromise = TeamController.getTeamInfos(player.team_id);
        teamPromises.push(teamPromise);
      });
      const teams = await Promise.all(teamPromises);
      data = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < playersInfos.length; i++) {
        const { team_id: teamId, ...playerData } = playersInfos[i];
        data.push({ ...playerData, teams: teams[i] });
      }
    }
    return res.status(200).json({ ...scout[0], players: data });
  }

  /**
 *Method to find statistics for a player's match.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing the statistics for the player's match.
   */

  static async getFindStatsPlayerMatch({ params }, res, next) {
    const findStatsPlayerMatch = await this.datamapper.findStatsPlayerByMatch(params.playerId);
    if (!findStatsPlayerMatch) return next(new ApiError("Statistics player not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = findStatsPlayerMatch;
    return res.status(200).json({ ...data });
  }

  /**
 *Method to search for specifications of a player.
 * @param {Object} param0 The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware.
 * @returns {Object} Response containing player information matching the search criteria.
 */
  static async getSearchSpecificationPlayer({ query }, res, next) {
    // Récupérez une préference du joueur depuis les paramètres d'itinéraire
    const searchPlayer = await PlayerDatamapper.findAll({ where: query });
    if (!searchPlayer[0]) return next(new ApiError("Player with this search not found", { httpStatus: 404 })); // Gérez le cas où le joueur n'est pas trouvé
    const teamPromises = [];
    searchPlayer.forEach((player) => {
      const teamPromise = TeamController.getTeamInfos(player.team_id);
      teamPromises.push(teamPromise);
    });
    const teams = await Promise.all(teamPromises);
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < searchPlayer.length; i++) {
      const { team_id: teamId, ...playerData } = searchPlayer[i];
      data.push({ ...playerData, teams: teams[i] });
    }
    return res.status(200).json(data);
  }
}
