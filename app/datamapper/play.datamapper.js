import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for play-related operations.
 * Extends the CoreDatamapper class.
 */

export default class PlayDatampper extends CoreDatamapper {
  /**
   * The table name for play data.
   * @type {string}
   */
  static tableName = "play";
  /**
   * The table name for reading play information.
   * @type {string}
   */

  static readTableName = "play";
}
