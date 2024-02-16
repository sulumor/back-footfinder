import PlayDatampper from "../datamapper/play.datamapper.js";
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

  static async getOneMatchStats({ params }, res, next) {
    const matchStats = await this.datamapper.getOneMatch(params);
    console.log(matchStats);
    if (!matchStats[0]) return next(new ApiError("No match Found", { httpStatus: 404 }));
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

  static async postOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.postOneMatch(data);
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
    return res.status(201).json(results);
  }

  static async updateOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.updateOneMatch(data);
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
    return res.status(201).json(results);
  }

  static async deleteOneMatchStats({ params }, res, next) {
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const deleted = await this.datamapper.deleteOneMatch(params);
    if (!deleted) return next(new ApiError("No stats found", { httpStatus: 404 }));
    return res.status(204).end();
  }
}
