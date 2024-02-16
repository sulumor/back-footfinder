import CoreDatamapper from "./core.datamapper.js";

export default class TeamDatamapper extends CoreDatamapper {
  static tableName = "team";

  static readTableName = "team_view";
}
