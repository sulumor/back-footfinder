import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class StatisticsDatamapper extends CoreDatamapper {
  static tableName = "statistics";

  static readTableName = "statistics_view";

  static postTableName = "add_statistics";

  static updateTableName = "update_statistics";

  static async getStatsByPlayer(id) {
    const result = await client.query(`SELECT * FROM ${this.readTableName} WHERE id=$1`, [id]);
    return result.rows;
  }

  static async getOneMatch({ id, matchId }) {
    const result = await client.query(`SELECT * FROM ${this.readTableName} WHERE id=$1 AND match_id=$2`, [id, matchId]);
    return result.rows;
  }

  static async postOneMatch(json) {
    const result = await client.query(`SELECT * FROM ${this.postTableName}($1)`, [json]);
    return result.rows;
  }

  static async updateOneMatch(json) {
    const result = await client.query(`SELECT * FROM ${this.updateTableName}($1)`, [json]);
    return result.rows;
  }

  static async deleteOneMatch({ matchId }) {
    const result = await client.query(`DELETE FROM "${this.tableName}" WHERE "match_id" = $1`, [matchId]);
    return !!result.rowCount;
  }
}
