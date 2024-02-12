import client from "../helpers/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class AuthDatamapper extends CoreDatamapper {
  static tableName = "user";

  static async findByRole({ id, roleId }) {
    const role = await client.query("SELECT * FROM \"role\" WHERE id=$1", [roleId]);
    const roleTable = role.rows[0].label === "joueur" ? "player" : "scout";
    const result = await client.query(`SELECT * FROM "${this.tableName}" JOIN ${roleTable} ON "${this.tableName}".id = ${roleTable}.${this.tableName}_id WHERE "${this.tableName}".id=$1`, [id]);
    return { role: role.rows[0].label, ...result.rows[0] };
  }
}
