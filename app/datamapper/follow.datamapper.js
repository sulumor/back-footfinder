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
}
