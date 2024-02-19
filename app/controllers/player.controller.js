/* eslint-disable import/no-cycle */
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import ScoutController from "./scout.controller.js";
import TeamController from "./team.controller.js";

export default class PlayerController extends CoreController {
  static datamapper = PlayerDatamapper;

  static async getPlayerInfos(playerIds) {
    const allPlayerPromises = [];
    playerIds.forEach((id) => {
      const playerPromise = this.datamapper.findAll({ where: { player_id: id } });
      allPlayerPromises.push(playerPromise);
    });
    return (await Promise.all(allPlayerPromises)).map((player) => player[0]);
  }

  static async getAllInfos({ params }, res, next) {
    const user = await this.datamapper.findAll({ where: { id: params.id } });
    if (user.length < 1) return next(new ApiError("User not found", { httpStatus: 404 }));
    const teamResult = await TeamController.getTeamInfos(user[0].team_id);
    const scoutResult = await ScoutController.getScoutInfos(user[0].scout_id);
    const {
      team_id: teamId, scout_id: scoutId, ...userData
    } = user[0];
    return res.status(200).json({ ...userData, teams: teamResult, scouts: scoutResult });
  }
}
