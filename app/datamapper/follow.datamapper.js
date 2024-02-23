/* eslint-disable max-len */
import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class FollowDatamapper extends CoreDatamapper {
  static tableName = "follow";

  static createTableName = "add_follow";

  static async deleteByPlayerIdAndScoutId({ id, scoutId }) {
    const result = await client.query("SELECT * FROM delete_follow($1)", [{ id, scoutId }]);
    return result.rows[0];
  }
}
