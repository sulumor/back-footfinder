import ApiError from "../errors/api.error.js";

/**
 * Basic controller providing CRUD operations.
 */

export default class CoreController {
  static datamapper;

  /**
 * Method to retrieve all entries
 * @param {Object} _ the subject of the request
 * @param {Object} res reponse de l'objet
 * @returns the return that the request was successful
 */
  static async getAll(_, res) {
    const rows = await this.datamapper.findAll();
    return res.status(200).json(rows);
  }

  /**
   * Method to retrieve an entry by Id
   * @param {Object} param0
   * @param {Object} res the response object
   * @param {Function} next the next middleware
   * @returns returns a 404 error message
   */
  static async getByPk({ params }, res, next) {
    const { id } = params;
    const row = await this.datamapper.findByPk(id);
    if (!row) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(200).json(row);
  }

  /**
   * Method to create a new entry
   * @param {Object} param0
   * @param {Object} res response to the request
   * @returns confirmation message of the new entry
   */
  static async create({ body }, res) {
    const row = await this.datamapper.insert(body);
    return res.status(201).json(row);
  }

  /**
   * Method to update an existing entry.
   * @param {Object} req The query object.
   * @param {Object} res response to the request
   * @param {Function} next The next middleware
   * @returns {Object} The updated entry for the resource.
   */

  static async update({ params, body }, res, next) {
    const { id } = params;
    const row = await this.datamapper.update(id, body);
    if (!row) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(200).json(row);
  }

  /**
 * Method to delete an existing entry
 * @param {Object} param0 The query object
 * @param {Object} res response to the request
 * @param {Function} next The next middleware
 * @returns {Object} Response indicating deletion success
 */

  static async delete({ params }, res, next) {
    const { id } = params;
    const deleted = await this.datamapper.delete(id);
    if (!deleted) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    return res.status(204).end();
  }

  /**
   *Method to create a new entry via SQL
   * @param {Object} param0 query object
   * @param {Object} res response to the request
   * @param {Function} next The next middleware
   * @returns {Object} The new resource entry
   */
  static async createSQL({ params, body }, res, next) {
    const datas = { ...params, ...body };
    const row = await this.datamapper.insertSQL(datas);
    if (!row) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    if (!row[0].id) return next(new ApiError("User not Found", { httpStatus: 404 }));
    return res.status(201).json(row);
  }

  /**
   *Method to update an existing entry via SQL.
   * @param {Object} param0 The query object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware
   * @returns {Oject} The updated entry for the resource.
   */

  static async updateSQL({ params, body }, res, next) {
    const row = await this.datamapper.updateSQL({ ...params, ...body });
    if (!row) return next(new ApiError("Ressource not Found", { httpStatus: 404 }));
    if (!row[0].id) return next(new ApiError("User not Found", { httpStatus: 404 }));
    return res.status(201).json(row);
  }
}
