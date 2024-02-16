import MatchDatamapper from "../datamapper/match.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import TeamController from "./team.controller.js";

export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  static async getAllMatchesByUserId({ params }, res, next) {
    const matches = await this.datamapper.findAll({ where: { id: params.id } });
    if (!matches.id) return next(new ApiError("Player not found", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matches);
    return res.status(200).json(results);
  }

  static async createMatch({ params, body }, res, next) {
    const match = await this.datamapper.insertSQL({ ...params, ...body });
    if (!match.id | !match.match_id) return next(new ApiError("Player not Found", { httpStatus: 404 }));
    const result = await TeamController.getHomeAndAwayTeamsInfos(match);
    return res.status(201).json(result);
  }

  static async updateMatch({ params, body }, res, next) {
    const updateInfos = { ...params, ...body };
    const updatedMatch = await this.datamapper.updateSQL(updateInfos);
    if (!updatedMatch.id | !updatedMatch.match_id) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const result = await TeamController.getHomeAndAwayTeamsInfos(updatedMatch);
    return res.status(201).json(result);
  }
}
