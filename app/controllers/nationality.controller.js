import NationalityDatamapper from "../datamapper/nationality.datamapper.js";
import CoreController from "./core.controller.js";

export default class NationalityController extends CoreController {
  static datamapper = NationalityDatamapper;
}
