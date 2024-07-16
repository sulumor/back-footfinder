import Joi from "joi";
import { passwordRegex } from "../utils/regex.schema.js";

export default Joi.object({
  password: Joi.string()
    .pattern(passwordRegex)
    .messages({
      "string.empty": "Le mot de passe est requis",
      "string.pattern.base": "Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.",
    })
    .required(),
  confirmedPassword: Joi.ref("password"),
  id: Joi.string().required(),
}).required();
