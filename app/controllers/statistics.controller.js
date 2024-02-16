import StatisticsDatamapper from "../datamapper/statistics.datamapper.js";
import CoreController from "./core.controller.js";

export default class StatisticsController extends CoreController {
  static datamapper = StatisticsDatamapper;

  static async getStatsByPlayer({ params }, res, next) {
    const stats = await this.datamapper.getStatsByPlayer
  }
}
