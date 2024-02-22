import FollowDatamapper from "../datamapper/follow.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";

export default class FollowController extends CoreController {
  static datamapper = FollowDatamapper;

  static async deleteOneLine({ params }, res, next) {
    const deleted = await this.datamapper.deleteByPlayerIdAndScoutId(params);
    if (!deleted) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(204).end();
  }

  static async insertPlayerFollow({ params }, res, next) {
    const followed = await this.datamapper.followByPlayerId(params);
    if (!followed) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(200).json(followed);
  }
}
