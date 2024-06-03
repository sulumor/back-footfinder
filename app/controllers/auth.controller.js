import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import AuthDatamapper from "../datamapper/auth.datamapper.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import { createAccessToken, createRefreshToken } from "../helpers/jwt.function.js";

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

    const [user] = await this.datamapper.findAll({ where: { email: body.email } });
    if (!user) return next(new ApiError(errorMessage, errorInfos));

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPasswordCorrect) return next(new ApiError(errorMessage, errorInfos));

    let data;
    if (user.role) [data] = await PlayerDatamapper.findAll({ where: { email: body.email } });
    if (!user.role) [data] = await ScoutDatamapper.findAll({ where: { email: body.email } });
    if (!data) return res.status(200).json(user);

    res.cookie("refresh_token", createRefreshToken(data), { httpOnly: true });

    return res.status(200).json({ accessToken: createAccessToken(data) });
  }

  static getUser({ user }, res) {
    return res.status(200).json(user);
  }

  /**
   * Method to create a new access token with a refresh token
   * @param {Express.Request.cookies} cookies The refresh cookie
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   * @returns {Express.Response | ApiError}
   */
  // eslint-disable-next-line consistent-return
  static refreshToken({ cookies }, res, next) {
    const refreshToken = cookies.refresh_token;
    if (!refreshToken) return next(new ApiError("Null token", { httpStatus: 401 }));
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return next(new ApiError(err.message, { httpStatus: 403 }));
      return res.status(200).json({ accessToken: createAccessToken(user) });
    });
  }

  /**
   * Method to delete the refresh cookie
   * @param {*} _
   * @param {Express.Response} res
   * @returns  {Express.Response}
   */
  static deleteToken(_, res) {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted" });
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
    let person;
    if (data.role === "joueur") person = await PlayerDatamapper.insertSQL(user);
    if (data.role === "recruteur") person = await ScoutDatamapper.insertSQL(user);

    res.cookie("refresh_token", createRefreshToken(person), { httpOnly: true });
    return res.status(201).json({ accessToken: createAccessToken(person) });
  }

  /**
   * Method for registering a new user.
   * @param {Object} req The query object.
   * @param {Object} res The response object.
   * @param {Function} next The next middleware.
   * @returns {Object} The data of the newly registered user and the JWT token.
   */
  static async signup({ params, body }, res) {
    // const [existsUser] = await this.datamapper.findAll({
    //   where: {
    //     email: body.email,
    //     role: params.role,
    //   },
    // });
    // if (!existsUser) return next(new ApiError("Authentification failed", { httpStatus: 401 }));
    let person;
    if (params.role === "joueur") person = await PlayerDatamapper.insertSQL(body);
    if (params.role === "recruteur") person = await ScoutDatamapper.insertSQL(body);

    // const token = createJWT(person);

    return res.status(201).json({ person, password: body.password });
  }
}
