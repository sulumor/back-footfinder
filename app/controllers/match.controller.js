import MatchDatamapper from "../datamapper/match.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import getHomeAndAwayTeamsInfos from "../helpers/functions.js";

export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  static async createSQL({ params, body }, res, next) {
    const createInfos = { id: params.id, ...body };
    const match = await this.datamapper.createSQL(createInfos);
    if (!match) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const result = await getHomeAndAwayTeamsInfos(match);
    return res.status(201).json(result);
  }

  static async updateSQL({ params, body }, res, next) {
    const updateInfos = { ...params, ...body };
    const updatedMatch = await this.datamapper.updateSQL(updateInfos);
    // eslint-disable-next-line no-bitwise
    if (!updatedMatch.id | !updatedMatch.match_id) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const result = await getHomeAndAwayTeamsInfos(updatedMatch);
    return res.status(201).json(result);
  }
}
