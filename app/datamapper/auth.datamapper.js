import CoreDatamapper from "./core.datamapper.js";

/**
 * Data mapper class for authentication-related operations.
 * Extends the CoreDatamapper class.
 */
export default class AuthDatamapper extends CoreDatamapper {
  /**
   * The table name for user authentication.
   * @type {string}
   */
  static tableName = "user";

  /**
   * The table name for reading authentication information.
   * @type {string}
   */
  static readTableName = "auth_view";

  /**
   * The table name for creating user authentication.
   * @type {string}
   */
  static createTableName = "add_user";
}
