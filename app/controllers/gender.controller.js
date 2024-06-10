import GenderDatamapper from "../datamapper/gender.datamapper.js";
import CoreController from "./core.controller.js";

export default class GenderController extends CoreController {
  static datamapper = GenderDatamapper;
}
