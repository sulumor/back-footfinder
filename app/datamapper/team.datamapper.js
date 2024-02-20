import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class TeamDatamapper extends CoreDatamapper {
  static tableName = "team";

  static readTableName = "team_view";

  static async findAllTeams() {
    const result = await client.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }
}
