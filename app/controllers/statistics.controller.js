import StatisticsDatamapper from "../datamapper/statistics.datamapper.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";

export default class StatisticsController extends CoreController {
  static datamapper = StatisticsDatamapper;

  static async getStatsByPlayer({ params }, res, next) {
    const stats = await this.datamapper.getStatsByPlayer(params.id);
    if (!stats) return next(new ApiError("Ressource not found", { httpStatus: 404 }));
    const homePromise = [];
    const awayPromise = [];
    stats.forEach((match) => {
      const home = TeamDatamapper.findAll({ where: { team_id: match.team_id_as_home } });
      homePromise.push(home);
      const away = TeamDatamapper.findAll({ where: { team_id: match.team_id_as_outside } });
      awayPromise.push(away);
    });

    const homeTeams = (await Promise.all(homePromise)).map((m) => m[0]);
    const awayTeams = (await Promise.all(awayPromise)).map((m) => m[0]);
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < stats.length; i++) {
      const obj = {
        ...stats[i],
        team_id_as_home: homeTeams[i],
        team_id_as_outside: awayTeams[i],
      };
      results.push(obj);
    }
    return res.status(200).json(results);
  }

  static async getOneMatch({ params }, res, next) {
    const matchStats = await this.datamapper.getOneMatch(params);
    if (!matchStats) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    const homePromise = [];
    const awayPromise = [];
    matchStats.forEach((match) => {
      const home = TeamDatamapper.findAll({ where: { team_id: match.team_id_as_home } });
      homePromise.push(home);
      const away = TeamDatamapper.findAll({ where: { team_id: match.team_id_as_outside } });
      awayPromise.push(away);
    });

    const homeTeams = (await Promise.all(homePromise)).map((m) => m[0]);
    const awayTeams = (await Promise.all(awayPromise)).map((m) => m[0]);
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < matchStats.length; i++) {
      const obj = {
        ...matchStats[i],
        team_id_as_home: homeTeams[i],
        team_id_as_outside: awayTeams[i],
      };
      results.push(obj);
    }
    return res.status(200).json(results);
  }
}
