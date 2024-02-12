import PlayerDatamapper from "../datamapper/player.datamapper.js";
import CoreController from "./core.controller.js";

export default class PlayerController extends CoreController {
  static datamapper = PlayerDatamapper;
}