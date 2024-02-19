import CoreDatamapper from "./core.datamapper.js";
import client from "../helpers/pg.client.js";

export default class ScoutDatamapper extends CoreDatamapper {
  static tableName = "scout";

  static readTableName = "scout_view";

  static updateTableName = "update_scout";

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
