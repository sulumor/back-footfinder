import CoreDatamapper from "./core.datamapper.js";
import client from "../helpers/pg.client.js";
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

  /**
 *Finds statistics for a player by their play ID.
 * @param {string} playId The ID of the play.
 * @returns {Promise<Object>} A promise resolving to the statistics for the player.
 */
  static async findStatsPlayerByMatch(playId) {
    const result = await client.query(`
    SELECT * FROM "play"
    JOIN "statistics" ON "play".id = "statistics".id
    WHERE "play".player_id=$1`, [playId]);
    return result.rows[0];
  }
}
