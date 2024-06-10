import CoreDatamapper from "./core.datamapper.js";

export default class GenderDatamapper extends CoreDatamapper {
  /**
   * The table name for gender data
   * @type {string}
   */
  static tableName = "gender";

  /**
     * The table name for gender_view
     * @type {string}
     */

  static readTableName = "gender_view";
}
