import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";
/**
 * Data mapper class for statistics-related operations.
 * Extends the CoreDatamapper class.
 */

export default class StatisticsDatamapper extends CoreDatamapper {
  /**
   * The table name for statistics data.
   * @type {string}
   */
  static tableName = "statistics";

  /**
   * The table name for reading statistics information.
   * @type {string}
   */

  static readTableName = "statistics_view";
  /**
   * The table name for creating statistics data.
   * @type {string}
   */

  static createTableName = "add_statistics";
  /**
   * The table name for updating statistics data.
   * @type {string}
   */

  static updateTableName = "update_statistics";
  /**
   *Retrieves global statistics based on the provided ID
   * @param {string} id The ID used to retrieve global statistics.
   * @returns {Promise<Object>} - A promise resolving to the global statistics.
   */

  static async getGlobalStats(id) {
    const result = await client.query(`
    SELECT 
      AVG("assists") AS "assists", 
      AVG("goals_scored") AS "goals_scored", 
      AVG("red_card") AS "red_card", 
      AVG("yellow_card") AS "yellow_card", 
      AVG("stops") AS "stops", 
      AVG("goals_conceded") AS "goals_conceded" 
    FROM ${this.readTableName} WHERE id=$1`, [id]);
    return result.rows[0];
  }
}
