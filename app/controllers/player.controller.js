import MatchDatamapper from "../datamapper/match.datamapper.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";
import ApiError from "../errors/api.error.js";
import getHomeAndAwayTeamsInfos from "../helpers/functions.js";
import CoreController from "./core.controller.js";

export default class PlayerController extends CoreController {
  static datamapper = PlayerDatamapper;

  static async getWithUser({ params }, res, next) {
    const user = await this.datamapper.joinWithUser(params.id);
    if (!user) return next(new ApiError("Ressource not found", { httpStatus: 404 }));

    const teamPromises = [];
    user.team_id.forEach((team) => {
      const promise = TeamDatamapper.findAll({ where: { team_id: team } });
      teamPromises.push(promise);
    });
    const teamResult = (await Promise.all(teamPromises)).map((team) => team[0]);

    const scoutPromises = [];
    user.scout_id.forEach((scout) => {
      const promise = this.datamapper.getScoutInfo(scout);
      scoutPromises.push(promise);
    });
    const scoutResult = await Promise.all(scoutPromises);
    const { password: dontKeep, ...data } = user;
    return res.status(200).json({ ...data, team_id: teamResult, scout_id: scoutResult });
  }

  static async updateAllInfosSQL({ params, body }, res, next) {
    const updateInfos = { id: params.id, ...body };
    const player = await this.datamapper.updateSQL(updateInfos);
    if (!player) return next(new ApiError("No player found with this id", { httpStatus: 404 }));
    return res.status(200).json(player);
  }

  static async getAllMatches({ params }, res, next) {
    const matches = await MatchDatamapper.findAll({ where: { id: params.id } });
    if (!matches) return next(new ApiError("No matches for this player", { httpStatus: 404 }));

    const results = await getHomeAndAwayTeamsInfos(matches);
    return res.status(200).json(results);
  }
}
