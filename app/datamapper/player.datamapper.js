import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class PlayerDatamapper extends CoreDatamapper {
  static tableName = "player";

  static async joinWithUser(id) {
    const result = await client.query(`
      SELECT * FROM "${this.tableName}" 
      JOIN "user" ON "${this.tableName}".user_id = "user".id
      JOIN "position" ON "${this.tableName}".position_id = "position".id
      WHERE "${this.tableName}".user_id=$1`, [id]);
    return result.rows[0];
  }
}
