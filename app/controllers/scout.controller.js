/* eslint-disable import/no-cycle */
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.error.js";
import PlayerController from "./player.controller.js";
import TeamController from "./team.controller.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";

export default class ScoutController extends CoreController {
  static datamapper = ScoutDatamapper;

  static async getScoutInfos(scoutId) {
    const allScoutPromises = [];
    scoutId.forEach((id) => {
      const scoutPromise = this.datamapper.findAll({ where: { scout_id: id } });
      allScoutPromises.push(scoutPromise);
    });
    return (await Promise.all(allScoutPromises)).map((scout) => scout[0]);
  }

  static async getAllInfos({ params }, res, next) {
    const scout = await this.datamapper.findByPk(params.id);
    if (!scout) return next(new ApiError("No scout found", { httpStatus: 404 }));
    const playersInfos = await PlayerController.getPlayerInfos(scout.player_id);
    const teamPromises = [];
    playersInfos.forEach((player) => {
      const teamPromise = TeamController.getTeamInfos(player.team_id);
      teamPromises.push(teamPromise);
    });
    const teams = await Promise.all(teamPromises);
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < playersInfos.length; i++) {
      const { team_id: teamId, ...playerData } = playersInfos[i];
      data.push({ ...playerData, teams: teams[i] });
    }
    return res.status(200).json(data);
  }

  static async getFindStatsPlayerMatch({ params }, res, next) {
    const findStatsPlayerMatch = await this.datamapper.findStatsPlayerByMatch(params.playerId);
    if (!findStatsPlayerMatch) return next(new ApiError("Statistics player not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = findStatsPlayerMatch;
    return res.status(200).json({ ...data });
  }

  static async getSearchSpecificationPlayer({ query }, res, next) {
    // eslint-disable-next-line max-len
    const searchPlayer = await PlayerDatamapper.findAll({ where: query }); // Récupérez une préference du joueur depuis les paramètres d'itinéraire
    const player = await PlayerDatamapper.joinWithUser(searchPlayer[0].id);
    if (!player) return next(new ApiError("Player with this search not found", { httpStatus: 404 })); // Gérez le cas où le joueur n'est pas trouvé
    const { password: dontKeep, ...data } = player;
    return res.status(200).json({ ...data });
  }
}
