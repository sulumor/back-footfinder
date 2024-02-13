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

  // static async updateAllInfos({ params, body }, res) {
  //   const {
  //     firstname, lastname, email, password,
  //     birth_date, nationality, avatar, genre, strong_foot,
  //   } = body;
  //   const userTableBody = {
  //     firstname, lastname, email, password,
  //   };
  //   const playerTableBody = {
  //     birth_date, nationality, avatar, genre, strong_foot,
  //   };
  //   const user = await AuthDatamapper.findByPk(params.id);
  //   const player = await this.datamapper.findByPk(params.id);

  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const key in userTableBody) {
  //     if (userTableBody[key] === undefined) {
  //       userTableBody[key] = user[key];
  //     }
  //   }
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const key in playerTableBody) {
  //     if (playerTableBody[key] === undefined) {
  //       playerTableBody[key] = player[key];
  //     }
  //   }
  //   const updatePlayer = await this.datamapper.update(params.id, playerTableBody);
  //   const updateUser = await AuthDatamapper.update(params.id, userTableBody);

  //   return res.status(200).json({ ...updatePlayer, ...updateUser });
  // }

  static async updateAllInfosSQL({ params, body }, res) {
    const updateInfos = { id: params.id, ...body };
    const player = await this.datamapper.updateSQL(updateInfos);

    return res.status(200).json(player);
  }
}
