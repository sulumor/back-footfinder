import CoreDatamapper from "./core.datamapper.js";

export default class StatisticsDatamapper extends CoreDatamapper {
  static tableName = "statistics";

  static readTableName = "statistics_view";
}
