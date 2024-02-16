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
}
