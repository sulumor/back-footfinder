import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";
import AuthDatamapper from "../datamapper/auth.datamapper.js";
import PlayerDatamapper from "../datamapper/player.datamapper.js";
import ScoutDatamapper from "../datamapper/scout.datamapper.js";
import { createAccessToken, createRefreshToken } from "../helpers/jwt.function.js";

/**
 * Authentication controller
 */
export default class AuthController extends CoreController {
  static datamapper = AuthDatamapper;

  /**
   * Method to connect a user
   * @param { Express.Request.body } body Object with user's information
   * @param { Express.Response } res
   * @param { Express.NextFunction } next
   * @returns { RegisterResponse } The access token
   */
  static async login({ body }, res, next) {
    const errorMessage = "Authentification failed";
    const errorInfos = { httpStatus: 401 };

    const [user] = await this.datamapper.findAll({ where: { email: body.email } });
    if (!user) return next(new ApiError(errorMessage, errorInfos));

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPasswordCorrect) return next(new ApiError(errorMessage, errorInfos));

    const [data] = user.role
      ? await PlayerDatamapper.findAll({ where: { email: body.email } })
      : await ScoutDatamapper.findAll({ where: { email: body.email } });
    if (!data) return next(new ApiError(errorMessage, errorInfos));

    // res.cookie("refresh_token", createRefreshToken(data), {
    //   httpOnly: true,
    //   secure: true,
    //   path: "/",
    //   sameSite: "none",
    // });

    return res.status(200).json({
      accessToken: createAccessToken(data),
      refreshToken: createRefreshToken(data),
    });
  }

  /**
   * Method to send user information from token
   * @param { Express.Request.user } user Object with user's information
   * @param { Express.Response } res
   * @returns { UserToken } User's information from token
  */
  static getUser({ user }, res) {
    return res.status(200).json(user);
  }

  /**
   * Method to create a new access token with a refresh token
   * @param { Express.Request.cookies } cookies The refresh cookie
   * @param { Express.Response } res
   * @param { Express.NextFunction } next
   * @returns { RegisterResponse } The access token
   */
  // eslint-disable-next-line consistent-return
  static refreshToken({ body }, res, next) {
    const { refreshToken } = body;
    if (!refreshToken) return next(new ApiError("Null token", { httpStatus: 401 }));
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return next(new ApiError(err.message, { httpStatus: 403 }));
      return res.status(200).json({ accessToken: createAccessToken(user) });
    });
  }

  /**
   * Method to delete the refresh cookie
   * @param {*} _
   * @param { Express.Response } res
   * @returns { Express.Response }
   */
  static deleteToken(_, res) {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted" });
  }

  /**
   * Method to register a new user.
   * @param { Express.Request.body } body Object with user's information
   * @param { Express.Response } res
   * @param { Express.NextFunction } next
   * @returns { RegisterResponse } The access token
   */
  static async register({ body }, res, next) {
    const [existsUser] = await this.datamapper.findAll({ where: { email: body.email } });
    if (existsUser) return next(new ApiError("User already exists", { httpStatus: 400 }));

    const { confirmedPassword: dontKeep, ...data } = body;
    data.password = await bcrypt.hash(data.password, Number.parseInt(process.env.BCRYPT_SALT, 10));

    const user = await this.datamapper.insertSQL(data);

    const person = data.role
      ? await PlayerDatamapper.insertSQL(user)
      : await ScoutDatamapper.insertSQL(user);

    res.cookie("refresh_token", createRefreshToken(person), { httpOnly: true });

    return res.status(201).json({ accessToken: createAccessToken(person) });
  }
}
