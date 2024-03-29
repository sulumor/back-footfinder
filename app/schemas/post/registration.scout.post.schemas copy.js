import Joi from "joi";
import { roleRegex } from "../utils/regex.schema.js";

export default Joi.object({
  id: Joi.number()
    .integer()
    .messages({
      "number.base": "L'id doit être un nombre",
      "number.integer": "L'id doit être un entier",
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .messages({
      "string.empty": "L'email est requis",
      "string.email": "L'email donné n'est pas valide",
    })
    .required(),
  role: Joi.string()
    .pattern(roleRegex)
    .messages({
      "string.empty": "Le rôle est requis",
      "string.pattern.base": "Le rôle donné ne correspond pas",
    }).required(),
  club: Joi.string()
    .min(2)
    .messages({
      "string.empty": "Le club est requis",
      "string.min": "Le club doit avoir au moins 2 lettres",
    })
    .required(),
  city: Joi.string()
    .min(2)
    .messages({
      "string.empty": "La ville est requise",
      "string.min": "La ville doit avoir au moins 2 lettres",
    })
    .required(),
  avatar: Joi.string(),
}).required();
