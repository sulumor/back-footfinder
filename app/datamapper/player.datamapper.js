import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class PlayerDatamapper extends CoreDatamapper {
  static tableName = "player";

  static readTableName = "player_view";

  static updateTableName = "update_player";

  static async joinWithUser(id) {
    const result = await client.query(`SELECT * FROM "${this.readTableName}" WHERE id=$1`, [id]);
    return result.rows[0];
  }

  static async updateSQL(json) {
    const result = await client.query(`SELECT * FROM ${this.updateTableName}($1)`, [json]);
    return result.rows[0];
  }

  static async getScoutInfo(id) {
    const result = await client.query("SELECT * FROM scout_view WHERE scout_id=$1", [id]);
    return result.rows[0];
  }
}
