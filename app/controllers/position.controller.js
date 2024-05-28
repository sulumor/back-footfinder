import PositionDatamapper from "../datamapper/position.datamapper.js";
import CoreController from "./core.controller.js";

export default class PositionController extends CoreController {
  static datamapper = PositionDatamapper;
}
