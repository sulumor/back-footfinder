/* eslint-disable camelcase */
import PlayerDatamapper from "../datamapper/player.datamapper.js";
// import AuthDatamapper from "../datamapper/auth.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";

export default class PlayerController extends CoreController {
  static datamapper = PlayerDatamapper;

  static async getWithUser({ params }, res, next) {
    const user = await this.datamapper.joinWithUser(params.id);
    if (!user) return next(new ApiError("Ressource not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = user;
    return res.status(200).json({ ...data });
  }

  static async updateAllInfosSQL({ params, body }, res) {
    const updateInfos = { id: params.id, ...body };
    const player = await this.datamapper.updateSQL(updateInfos);

    return res.status(200).json(player);
  }

  static async getAllMatches({ params }, res, next) {
    const matches = await this.datamapper.getMatches(params.id);
    if (!matches) return next(new ApiError("No matches for this player", { httpStatus: 404 }));

    const homePromise = [];
    const awayPromise = [];
    matches.forEach((match) => {
      const home = this.datamapper.getTeamInfos(match.team_id_as_home);
      homePromise.push(home);
      const away = this.datamapper.getTeamInfos(match.team_id_as_outside);
      awayPromise.push(away);
    });

    const homeTeams = await Promise.all(homePromise);
    const awayTeams = await Promise.all(awayPromise);
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < matches.length; i++) {
      const obj = {
        ...matches[i],
        team_id_as_home: homeTeams[i],
        team_id_as_outside: awayTeams[i],
      };
      results.push(obj);
    }
    return res.status(200).json(results);
  }
}
