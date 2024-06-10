import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for scout-related operations.
 * Extends the CoreDatamapper class.
 */

export default class ScoutDatamapper extends CoreDatamapper {
  /**
   * The table name for scout data.
   * @type {string}
   */
  static tableName = "scout";

  /**
   * The table name for reading scout information.
   * @type {string}
   */

  static readTableName = "scout_view";

  /**
   * The table name for creating scout data.
   * @type {string}
   */

  static createTableName = "add_scout";

  /**
   * The table name for updating scout data.
   * @type {string}
   */

  static updateTableName = "update_scout";
}
