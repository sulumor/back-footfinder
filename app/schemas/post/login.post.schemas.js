import Joi from "joi";
import { logPasswordRegex, roleRegex } from "../utils/regex.schema.js";

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .messages({
      "string.empty": "L'email ne doit pas être vide",
      "string.email": "L'email donné n'est pas valide",
    })
    .required(),
  password: Joi.string()
    .pattern(logPasswordRegex)
    .messages({
      "string.empty": "Le mot de passe ne doit pas être vide",
      "string.pattern.base": "Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.",
    })
    .required(),
  role: Joi.string()
    .pattern(roleRegex)
    .messages({
      "string.empty": "Le rôle ne doit pas être vide",
      "string.pattern.base": "Le rôle donné ne correspond pas",
    })
    .required(),
}).required();
