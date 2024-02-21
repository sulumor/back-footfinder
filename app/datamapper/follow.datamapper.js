import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class FollowDatamapper extends CoreDatamapper {
  static tableName = "follow";

  static async deleteByPlayerIdAndScoutId({ id, scoutId }) {
    const scoutUserId = await client.query("SELECT id FROM scout WHERE user_id=$1", [scoutId]);
    const playerUserId = await client.query("SELECT id FROM player WHERE user_id=$1", [id]);
    const result = await client.query("DELETE FROM follow WHERE player_id=$1 AND scout_id=$2", [playerUserId.rows[0].id, scoutUserId.rows[0].id]);
    return !!result.rowCount;
  }

  static async followByPlayerId({ id, scoutId }) {
    const scoutUserId = await client.query("SELECT id FROM scout WHERE user_id=$1", [scoutId]);
    const playerId = await client.query("SELECT id FROM player WHERE user_id=$1", [id]);
    const result = await client.query("INSERT FROM follow WHERE player_id=$1 AND scout_id=$2", [playerId.rows[0].id, scoutUserId.rows[0].id]);
    return result.rowCount;
  }
}
