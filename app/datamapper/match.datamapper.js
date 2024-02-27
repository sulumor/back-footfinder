import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for match-related operations.
 * Extends the CoreDatamapper class.
 */
export default class MatchDatamapper extends CoreDatamapper {
  /**
   * The table name for match data.
   * @type {string}
   */
  static tableName = "match";
  /**
   * The table name for reading match information.
   * @type {string}
   */

  static readTableName = "match_view";
  /**
   * The table name for creating match data.
   * @type {string}
   */

  static createTableName = "add_match";
  /**
   * The table name for updating match data.
   * @type {string}
   */

  static updateTableName = "update_match";

  static deleteTableName = "delete_match";
}
