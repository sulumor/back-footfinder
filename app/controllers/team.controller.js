import CoreController from "./core.controller.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";

/**
 * Controller to manage operations related to teams.
 */
export default class TeamController extends CoreController {
  static datamapper = TeamDatamapper;
}
