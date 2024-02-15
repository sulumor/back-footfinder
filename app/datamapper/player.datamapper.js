import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class PlayerDatamapper extends CoreDatamapper {
  static tableName = "player";

  static readTableName = "player_view";

  static updateTableName = "update_player";

  static async joinWithUser(id) {
    const result = await client.query(`
      SELECT * FROM "${this.readTableName}" WHERE id=$1`, [id]);

    const teamPromises = [];
    result.rows[0].team_id.forEach((team) => {
      const promise = client.query("SELECT * FROM team_view WHERE team_id=$1", [team]);
      teamPromises.push(promise);
    });
    const teamResult = (await Promise.all(teamPromises)).map((t) => t.rows[0]);

    const scoutPromises = [];
    result.rows[0].scout_id.forEach((scout) => {
      const promise = client.query("SELECT * FROM scout_view WHERE scout_id=$1", [scout]);
      scoutPromises.push(promise);
    });
    const scoutResult = (await Promise.all(scoutPromises)).map((s) => s.rows[0]);

    return { ...result.rows[0], team: teamResult, scout: scoutResult };
  }

  static async updateSQL(json) {
    // eslint-disable-next-line quotes
    const result = await client.query(`SELECT * FROM ${this.updateTableName}($1)`, [json]);
    return result.rows[0];
  }

  static async getMatches(id) {
    const result = await client.query("SELECT * FROM match_view WHERE id=$1", [id]);
    return result.rows;
  }

  static async getTeamInfos(id) {
    const result = await client.query("SELECT * FROM team_view WHERE team_id=$1", [id]);
    return result.rows[0];
  }
}
