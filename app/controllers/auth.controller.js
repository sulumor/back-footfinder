import bcrypt from "bcrypt";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import AuthDatamapper from "../datamapper/auth.datamapper.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import createJWT from "../helpers/jwt.function.js";

/**
 * Contrôleur gérant l'authentification des utilisateurs.
 */
export default class AuthController extends CoreController {
  static datamapper = AuthDatamapper;

  /**
   * Method for logging in a user.
   * @param {Object} req The query object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} The data of the logged in user and the JWT token.
   */
  static async login({ body }, res, next) {
    const errorMessage = "Authentification failed";
    const errorInfos = { httpStatus: 401 };

    const [user] = await this.datamapper.findAll({ where: { email: body.email, role: body.role } });
    if (!user) return next(new ApiError(errorMessage, errorInfos));

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPasswordCorrect) return next(new ApiError(errorMessage, errorInfos));

    let data;
    if (body.role === "joueur") data = await PlayerDatamapper.findAll({ where: { email: body.email } });
    if (body.role === "recruteur") data = await ScoutDatamapper.findAll({ where: { email: body.email } });
    console.log(data);
    if (!data[0]) return res.status(200).json(user);
    const token = createJWT(data[0]);
    console.log(token);

    return res.status(200).json({ data: data[0], token });
  }

  /**
   * Method for registering a new user.
   * @param {Object} req The query object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} Data of the newly registered user
   */
  static async register({ body }, res, next) {
    const [existsUser] = await this.datamapper.findAll({ where: { email: body.email } });
    if (existsUser) return next(new ApiError("User already exists", { httpStatus: 400 }));
    const { confirmedPassword: dontKeep, ...data } = body;

    data.password = await bcrypt.hash(data.password, Number.parseInt(process.env.BCRYPT_SALT, 10));
    const user = await this.datamapper.insertSQL(data);
    return res.status(201).json(user);
  }

  /**
   * Method for registering a new user.
   * @param {Object} req The query object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} The data of the newly registered user and the JWT token.
   */
  static async signup({ params, body }, res, next) {
    const [existsUser] = await this.datamapper.findAll({
      where: {
        email: body.email,
        role: params.role,
      },
    });
    if (!existsUser) return next(new ApiError("Authentification failed", { httpStatus: 401 }));
    let person;
    if (params.role === "joueur") person = await PlayerDatamapper.insertSQL(body);
    if (params.role === "recruteur") person = await ScoutDatamapper.insertSQL(body);

    const token = createJWT(person);

    return res.status(201).json({ data: person, token });
  }
}
