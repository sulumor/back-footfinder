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
   * Finds a scout by associated player ID.
   * @param {string} playerId The ID of the associated player.
   * @returns {Promise<Object>} A promise resolving to the scout associated with the player ID.
   */

  static async findByPlayer(playerId) {
    const result = await client.query(` 
      SELECT * FROM "${this.readTable}"
      JOIN "user" ON "${this.readTable}".user_id = "user".id
      WHERE "${this.readTable}".user_id=$1`, [playerId]);
    return result.rows[0];
  }

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

  /**
 *Searches for players based on scout's specifications.
 * @param {string} PlayerId The ID of the player.
 * @returns {Promise<Object>} - A promise resolving to the player
 *  matching the scout's specifications.
 */

  static async searchSpecificationPlayer(PlayerId) {
    const result = await client.query(`
    SELECT * FROM "${this.readTable}"
    JOIN "user" ON "${this.readTable}".user_id = "user".id 
    WHERE "${this.readTable}".position_id=$1`, [PlayerId]);
    return result.rows[0];
  }
}
