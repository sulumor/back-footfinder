import FollowDatamapper from "../datamapper/follow.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";

/**
 * Controller to handle operations related to following players by scouts
 */
export default class FollowController extends CoreController {
  static datamapper = FollowDatamapper;

  /**
   *Method to delete a specific follow line by player ID and scout ID.
   * @param {Object} param0 The request object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} Response indicating the success of the deletion.
   */
  static async deleteOneLine({ params }, res, next) {
    const deleted = await this.datamapper.deleteByPlayerIdAndScoutId(params);
    if (!deleted) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(204).end();
  }

  /**
   *
   * Method to insert a follow of a player by a scout.
   * @param {number} id  The ID of the player to follow.
   * @param {number} scoutId  The ID of the scout following the player.
   * @param {Object} res  The response object.
   * @param {Function} next - The next middleware.
   * @returns {Object} - Response indicating the success of the follow insertion.
   */

  static async insertPlayerFollow({ id, scoutId }, res, next) {
    const followed = await this.datamapper.followByPlayerId({ id, scoutId });
    if (!followed) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(204).end();
  }
}
