import client from "../helpers/pg.client.js";
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

  /**
   * Retrieves all teams.
   * @returns {Promise<Array<Object>>} A promise resolving to an array of team objects.
   */

  static async findAllTeams() {
    const result = await client.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }
}
