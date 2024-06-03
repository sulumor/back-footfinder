import CoreDatamapper from "./core.datamapper.js";

export default class NationalityDatamapper extends CoreDatamapper {
  /**
   * The table name for gender data
   * @type {string}
   */
  static tableName = "nationality";

  /**
       * The table name for gender_view
       * @type {string}
       */

  static readTableName = "nationality_view";
}
