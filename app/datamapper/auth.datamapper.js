import client from "../helpers/pg.client";
import CoreDatamapper from "./core.datamapper";

export default class AuthDatamapper extends CoreDatamapper {
  static tableName = "user";

  static async findByRole({ id, role_id }) {
    const role = await client.query(`SELECT * FROM "role" WHERE id=$1`, [role_id]);
    const result = await client.query(`SELECT * FROM ${this.tableName} JOIN ${role[0].libellé} ON ${this.tableName}.id = ${role[0].libellé}.${this.tableName}_id WHERE ${this.tableName}.id=$1`, [id]);
    return result;
  }
}