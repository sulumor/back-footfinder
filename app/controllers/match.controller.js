import MatchDatamapper from "../datamapper/match.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import TeamController from "./team.controller.js";

export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  static async getAllMatchesByUserId({ params }, res, next) {
    const matches = await this.datamapper.findAll({ where: { id: params.id } });
    if (!matches[0]) return next(new ApiError("No match found for this player", { httpStatus: 404 }));
    const results = await TeamController.getMultipleHomeAndAwayTeamsInfos(matches);
    return res.status(200).json(results);
  }

  static async getOneMatchByUserId({ params }, res, next) {
    const data = { id: params.id, match_id: params.matchId };
    const matches = await this.datamapper.findAll({ where: data });
    if (!matches[0]) return next(new ApiError("No match found", { httpStatus: 404 }));
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
    if (!updatedMatch[0].id | !updatedMatch[0].match_id) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const result = await TeamController.getHomeAndAwayTeamsInfos(updatedMatch);
    return res.status(201).json(result);
  }

  static async deleteMatch({ params }, res, next) {
    const data = { id: params.matchId };
    const deletedMatch = await this.datamapper.deleteSQL(data);
    if (!deletedMatch) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(204).end();
  }
}
