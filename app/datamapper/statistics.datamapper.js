import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class StatisticsDatamapper extends CoreDatamapper {
  static tableName = "statistics";

  static readTableName = "statistics_view";

  static async getStatsByPlayer(id) {
    const result = await client.query(`SELECT * FROM ${this.readTableName} WHERE id=$1`, [id]);
    return result.rows;
  }
}
