import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for team-related operations.
 * Extends the CoreDatamapper class.
 */

export default class TeamDatamapper extends CoreDatamapper {
  /**
   * The table name for team data.
   * @type {string}
   */
  static tableName = "team";

  /**
   * The table name for reading team information.
   * @type {string}
   */

  static readTableName = "team_view";
}
