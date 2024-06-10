import FollowDatamapper from "../datamapper/follow.datamapper.js";
import CoreController from "./core.controller.js";

/**
 * Controller to handle operations related to following players by scouts
 */
export default class FollowController extends CoreController {
  static datamapper = FollowDatamapper;
}
