import CoreDatamapper from "./core.datamapper.js";

/**
 * Data mapper class for follow-related operations.
 * Extends the CoreDatamapper class.
 */

export default class FollowDatamapper extends CoreDatamapper {
  /**
   * The table name for the follow relationship.
   * @type {string}
   */
  static tableName = "follow";

  static readTableName = "follow";

  static createTableName = "add_follow";

  static deleteTableName = "delete_follow";
}
