/* eslint-disable max-len */
import client from "../helpers/pg.client.js";
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

  static createTableName = "add_follow";

  /**
 *Deletes a follow relationship between a player and a scout.
 * @param {Object} params Parameters containing the player ID and scout ID.
 * @param {string} params.id The ID of the player.
 * @param {string} params.scoutId The ID of the scout.
 * @returns {Promise<boolean>} A promise resolving to a boolean indicating
 *  whether the deletion was successful.
 */
  static async deleteByPlayerIdAndScoutId({ id, scoutId }) {
    const result = await client.query("SELECT * FROM delete_follow($1)", [{ id, scoutId }]);
    return result.rows[0];
  }

  static async followByPlayerId({ id, scoutId }) {
    const scoutUserId = await client.query("SELECT id FROM scout WHERE user_id=$1", [scoutId]);
    const playerId = await client.query("SELECT id FROM player WHERE user_id=$1", [id]);
    const result = await client.query("INSERT FROM follow WHERE player_id=$1 AND scout_id=$2", [playerId.rows[0].id, scoutUserId.rows[0].id]);
    return result.rowCount;
  }
}
