import PlayDatampper from "../datamapper/play.datamapper.js";
import StatisticsDatamapper from "../datamapper/statistics.datamapper.js";
import ApiError from "../errors/api.error.js";
import getHomeAndAwayTeamsInfos from "../helpers/functions.js";
import CoreController from "./core.controller.js";

export default class StatisticsController extends CoreController {
  static datamapper = StatisticsDatamapper;

  static async getStatsByPlayer({ params }, res, next) {
    const stats = await this.datamapper.getStatsByPlayer(params.id);
    if (!stats) return next(new ApiError("Ressource not found", { httpStatus: 404 }));
    const results = await getHomeAndAwayTeamsInfos(stats);
    return res.status(200).json(results);
  }

  static async getOneMatchStats({ params }, res, next) {
    const matchStats = await this.datamapper.getOneMatch(params);
    if (!matchStats[0]) return next(new ApiError("No match Found", { httpStatus: 404 }));
    const results = await getHomeAndAwayTeamsInfos(matchStats);
    return res.status(200).json(results);
  }

  static async postOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.postOneMatch(data);
    const results = await getHomeAndAwayTeamsInfos(stats);
    return res.status(201).json(results);
  }

  static async updateOneMatchStats({ params, body }, res, next) {
    const data = { ...params, ...body };
    const matchExits = await PlayDatampper.findAll({
      where: { player_id: params.id, match_id: params.matchId },
    });
    if (!matchExits[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
    const stats = await this.datamapper.updateOneMatch(data);
    const results = await getHomeAndAwayTeamsInfos(stats);
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
