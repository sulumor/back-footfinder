// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import CoreController from "./core.controller.js";
import ApiError from "../errors/api.error.js";

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

  static async updateInfos({ params, body }, res) {
    const updateInfos = { id: params.id, ...body };
    const scout = await this.datamapper.updateSQL(updateInfos);
    return res.status(200).json(scout);
  }

  static async getWithUser({ params }, res, next) {
    const user = await this.datamapper.joinWithUser(params.id);
    if (!user) return next(new ApiError("Ressource not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = user;
    return res.status(200).json({ ...data });
  }

  static async getFindOnePlayer({ params }, res, next) {
    const findPlayer = await this.datamapper.findByPlayer(params.playerId);
    if (!findPlayer) return next(new ApiError("Player not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = findPlayer;
    return res.status(200).json({ ...data });
  }

  static async getFindStatsPlayerMatch({ params }, res, next) {
    const findStatsPlayerMatch = await this.datamapper.findStatsPlayerByMatch(params.playerId);
    if (!findStatsPlayerMatch) return next(new ApiError("Statistics player not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = findStatsPlayerMatch;
    return res.status(200).json({ ...data });
  }

  static async getSearchSpecificationPlayer({ params }, res, next) {
    const searchPlayer = await this.datamapper.searchSpecificationPlayer(params);
    if (!searchPlayer) return next(new ApiError("Player not found", { httpStatus: 404 }));
    const { password: dontKeep, ...data } = searchPlayer;
    return res.status(200).json({ ...data });
  }
}
