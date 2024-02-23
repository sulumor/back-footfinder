import FollowDatamapper from "../datamapper/follow.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import PlayerController from "./player.controller.js";
import TeamController from "./team.controller.js";

/**
 * Controller to handle operations related to following players by scouts
 */
export default class FollowController extends CoreController {
  static datamapper = FollowDatamapper;

  /**
   *Method to delete a specific follow line by player ID and scout ID.
   * @param {Object} param0 The request object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} Response indicating the success of the deletion.
   */
  static async deletePlayerFollow({ params }, res, next) {
    const deleted = await this.datamapper.deleteByPlayerIdAndScoutId(params);
    if (!deleted) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    let data = "Pas de joueur suivi";
    if (deleted.player_id[0] !== null) {
      const playersInfos = await PlayerController.getPlayerInfos(deleted.player_id);
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
    return res.status(200).json({ ...deleted, players: data });
  }

  static async insertPlayerFollow({ params }, res, next) {
    const followed = await this.datamapper.insertSQL(params);
    if (!followed) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    let data = "Pas de joueur suivi";
    if (followed.player_id[0] !== null) {
      const playersInfos = await PlayerController.getPlayerInfos(followed.player_id);
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
    return res.status(200).json({ ...followed, players: data });
  }
}
