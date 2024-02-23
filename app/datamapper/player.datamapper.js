import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for player-related operations.
 * Extends the CoreDatamapper class.
 */

export default class PlayerDatamapper extends CoreDatamapper {
  /**
   * The table name for player data.
   * @type {string}
   */
  static tableName = "player";

  /**
   * The table name for reading player information.
   * @type {string}
   */

  static readTableName = "player_view";

  /**
   * The table name for creating player data.
   * @type {string}
   */

  static createTableName = "add_player";

  /**
   * The table name for updating player data.
   * @type {string}
   */

  static updateTableName = "update_player";
}
