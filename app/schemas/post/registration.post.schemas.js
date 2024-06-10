import Joi from "joi";
import { genderRegex, lettersRegex, passwordRegex } from "../utils/regex.schema.js";

export default Joi.object({
  lastname: Joi.string()
    .min(2)
    .pattern(lettersRegex)
    .messages({
      "string.empty": "Le nom est requis",
      "string.pattern.base": "Le nom doit avoir que des lettres",
    })
    .required(),
  firstname: Joi.string()
    .min(2)
    .pattern(lettersRegex)
    .messages({
      "string.empty": "Le prénom est requis",
      "string.pattern.base": "Le prénom doit avoir que des lettres",
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .messages({
      "string.empty": "L'email est requis",
      "string.email": "L'email donné n'est pas valide",
    })
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .messages({
      "string.empty": "Le mot de passe est requis",
      "string.pattern.base": "Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.",
    })
    .required(),
  confirmedPassword: Joi.ref("password"),
  role: Joi.boolean()
    .required(),
  gender: Joi.string()
    .pattern(genderRegex)
    .messages({
      "string.empty": "Le genre est requis",
      "string.pattern.base": "Le genre choisi ne correspond pas",
    })
    .required(),
}).required();
