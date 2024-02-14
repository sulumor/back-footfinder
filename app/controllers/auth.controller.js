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
    const errorInfos = { httpStatus: 401 };


    if (!user) return next(new ApiError(errorMessage, errorInfos));

    //* a mettre en place après insertion des users avec mdp crypté
    // const isPasswordCorrect = await bcrypt.compare(body.password, user.password)
    // if (!isPasswordCorrect) return next(new ApiError(errorMessage, { httpStatus: 401 }));


    //* Ligne suvante à supprimer lorsque les 2 du dessus seront décommentées
    if (body.password !== user.password) return next(new ApiError(errorMessage, errorInfos));
  

    const person = await this.datamapper.findByRole(user);

    const { password: dontKeep, ...data } = person;
    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;
    const expiresAt = Math.round((new Date().getTime() / 1000) + expiresIn);
    const token = jwt.sign({ ...data }, process.env.JWT_PRIVATE_KEY);

    return res.status(200).json({ data: { ...data }, token: { jwt: token, expiresAt } });
  }

  static async register({ body }, res, next) {
    const [existsUser] = await this.datamapper.findAll({ where: { email: body.email } });
    if (existsUser) return next(new ApiError('User already exists', { httpStatus: 400 }));
    const { confirmedPassword: dontKeep, ...data } = body;

    const user = await this.datamapper.insert(...data);
    //TODO voir pour l'insertion du rôle

    const { password: dontKeeped, ...userWithoutPassword } = user;
    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;
    const expiresAt = Math.round((new Date().getTime() / 1000) + expiresIn);
    const token = jwt.sign({ ...data }, process.env.JWT_PRIVATE_KEY);

    return res.status(201).json({ data: { ...userWithoutPassword }, token: { jwt: token, expiresAt } });
  }
}