import CoreDatamapper from "./core.datamapper.js";

export default class PlayerDatamapper extends CoreDatamapper {
  static tableName = "player";

  static readTableName = "player_view";

  static createTableName = "add_player";

  static updateTableName = "update_player";
}
