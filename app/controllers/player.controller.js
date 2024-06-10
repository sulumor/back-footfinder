/* eslint-disable import/no-cycle */
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import CoreController from "./core.controller.js";

/**
 * Controller to manage operations related to players.
 */
export default class PlayerController extends CoreController {
  static datamapper = PlayerDatamapper;
}
