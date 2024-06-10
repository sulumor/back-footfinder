import CoreDatamapper from "./core.datamapper.js";

/**
 * Authentication datmapper
 */
export default class AuthDatamapper extends CoreDatamapper {
  /**
   * The table name for reading authentication information.
   * @type {string}
   */
  static readTableName = "auth_view";

  /**
   * The table name for creating new user.
   * @type {string}
   */
  static createTableName = "add_user";
}
