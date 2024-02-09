import jwt from "jsonwebtoken";
//*import bcrypt from "bcrypt";
import ApiError from "../errors/api.error.js";
import AuthDatamapper from "../datamapper/auth.datamapper.js";
import CoreController from "./core.controller.js";

export default class AuthController extends CoreController {
  static datamapper = AuthDatamapper;

  static async login({ body }, res, next) {
    const [user] = await this.datamapper.findAll({ where: { email: body.email } });
    const errorMessage = 'Authentification failed';

    if (!user) return next(new ApiError(errorMessage, { httpStatus: 401 }));

    //* a mettre en place après insertion des users avec mdp crypté
    // const isPasswordCorrect = await bcrypt.compare(body.password, user.password)
    // if (!isPasswordCorrect) return next(new ApiError(errorMessage, { httpStatus: 401 }));


    //* Ligne suvante à supprimer lorsque les 2 du dessus seront décommentées
    if (body.password !== user.password) return next(new ApiError(errorMessage, { httpStatus: 401 }));

    const person = await this.datamapper.findByRole(user);

    const { password: dontKeep, ...data } = person;

    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;

    const expiresAt = Math.round((new Date().getTime() / 1000) + expiresIn);

    const token = jwt.sign({ ...data }, process.env.JWT_PRIVATE_KEY);

    return res.status(200).json({ ...data, token, expiresAt });
  }
}