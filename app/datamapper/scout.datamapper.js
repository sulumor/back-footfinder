import CoreDatamapper from "./core.datamapper.js";
import client from "../helpers/pg.client.js";

export default class ScoutDatamapper extends CoreDatamapper {
  static tableName = "scout";

  static readTable = "player";

  static async updateSQL(json) {
    const result = await client.query(`SELECT * FROM update_scout ('${JSON.stringify(json)}');`);
    return result.rows[0];
  }

  static async joinWithUser(id) {
    const result = await client.query(`
      SELECT * FROM "${this.tableName}" 
      JOIN "user" ON "${this.tableName}".user_id = "user".id
      WHERE "${this.tableName}".user_id=$1`, [id]);
    return result.rows[0];
  }

  static async findByPlayer(playerId) {
    const result = await client.query(` 
      SELECT * FROM "${this.readTable}"
      JOIN "user" ON "${this.readTable}".user_id = "user".id
      WHERE "${this.readTable}".user_id=$1`, [playerId]);
    return result.rows[0];
  }

  static async findStatsPlayerByMatch(playId) {
    const result = await client.query(`
    SELECT * FROM "play"
    JOIN "statistics" ON "play".id = "statistics".id
    WHERE "play".player_id=$1`, [playId]);
    return result.rows[0];
  }

  static async searchSpecificationPlayer(PlayerId) {
    const result = await client.query(`
    SELECT * FROM "${this.readTable}"
    JOIN "user" ON "${this.readTable}".user_id = "user".id 
    WHERE "${this.readTable}".position_id=$1`, [PlayerId]);
    return result.rows[0];
  }
}
