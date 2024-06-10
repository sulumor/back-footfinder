import MatchDatamapper from "../datamapper/match.datamapper.js";
import CoreController from "./core.controller.js";
/**
 * Controller to manage operations related to matches.
 */
export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;
}
