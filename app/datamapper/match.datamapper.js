import CoreDatamapper from "./core.datamapper.js";

export default class MatchDatamapper extends CoreDatamapper {
  static tableName = "match";

  static readTableName = "match_view";

  static createTableName = "add_match";

  static updateTableName = "update_match";
}
