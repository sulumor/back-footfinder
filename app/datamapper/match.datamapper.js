import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class MatchDatamapper extends CoreDatamapper {
  static tableName = "match_view";

  static async createSQL(json) {
    const result = await client.query("SELECT * FROM \"add_match\"($1)", [json]);
    return result.rows[0];
  }
}
