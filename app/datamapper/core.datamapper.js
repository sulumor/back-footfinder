import client from "../helpers/pg.client.js";

/**
 * A base class for data mappers providing common database operations.
 */

export default class CoreDatamapper {
  /**
   * The table name for data retrieval.
   * @type {string}
   */
  static tableName;
  /**
   * The table name for reading data.
   * @type {string}
   */

  static readTableName;

  /**
   * The table name for creating data.
   * @type {string}
   */

  static createTableName;

  /**
   * The table name for updating data.
   * @type {string}
   */

  static updateTableName;

  static deleteTableName;

  /**
   * Retrieves multiple rows from the database based on the provided parameters.
   * @param {Object} params - Parameters for filtering data retrieval.
   * @param {Object} params.where - Conditions to filter the data.
   * @returns {Promise<Object[]>} - A promise resolving to an array of retrieved rows.
   */

  static async findAll(params) {
    let filter = "";
    const values = [];

    if (params?.where) {
      const filters = [];
      let indexPlaceholder = 1;

      Object.entries(params.where).forEach(([param, value]) => {
        if (param === "or") {
          const filtersOr = [];
          Object.entries(value).forEach(([key, val]) => {
            filtersOr.push(`"${key}" = $${indexPlaceholder}`);
            values.push(val);
            indexPlaceholder += 1;
          });
          filters.push(`(${filtersOr.join(" OR ")})`);
        } else {
          filters.push(`"${param}" = $${indexPlaceholder}`);
          values.push(value);
          indexPlaceholder += 1;
        }
      });
      filter = `WHERE ${filters.join(" AND ")}`;
    }
    const result = await client.query(`SELECT * FROM "${this.readTableName}" ${filter}`, values);
    return result.rows;
  }

  /**
 * Retrieves a single row from the database by its primary key.
 * @param {number} id The primary key of the row to retrieve.
 * @returns {Promise<Object>} A promise resolving to the retrieved row
 */
  static async findByPk(id) {
    const result = await client.query(`SELECT * FROM "${this.tableName}" WHERE id=$1`, [id]);
    return result.rows[0];
  }

  /**
 * Inserts data into the database using a stored procedure.
 * @param {Object} json The data to be inserted.
 * @returns {Promise<Object>} A promise resolving to the inserted data.
 */
  static async insertSQL(json) {
    const result = await client.query(`SELECT * FROM ${this.createTableName}($1)`, [json]);
    return result.rows[0];
  }

  /**
 * Updates data in the database using a stored procedure.
 * @param {Object} json The updated data.
 * @returns {Promise<Object[]>} A promise resolving to the updated data.
 */
  static async updateSQL(json) {
    const result = await client.query(`SELECT * FROM ${this.updateTableName}($1)`, [json]);
    return result.rows;
  }

  static async deleteSQL(json) {
    const result = await client.query(`SELECT * FROM ${this.deleteTableName}($1)`, [json]);
    return !!result.rowCount;
  }
}
