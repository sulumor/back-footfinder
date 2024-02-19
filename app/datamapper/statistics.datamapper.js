import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class StatisticsDatamapper extends CoreDatamapper {
  static tableName = "statistics";

  static readTableName = "statistics_view";

  static createTableName = "add_statistics";

  static updateTableName = "update_statistics";

  static async getGlobalStats(id) {
    const result = await client.query(`
    SELECT 
      AVG("assists") AS "assists", 
      AVG("goals_scored") AS "goals_scored", 
      AVG("red_card") AS "red_card", 
      AVG("yellow_card") AS "yellow_card", 
      AVG("stops") AS "stops", 
      AVG("goals_conceded") AS "goals_conceded" 
    FROM ${this.readTableName} WHERE id=$1`, [id]);
    return result.rows[0];
  }
}
