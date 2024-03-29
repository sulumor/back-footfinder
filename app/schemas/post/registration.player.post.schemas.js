import Joi from "joi";
import {
  footRegex, genreRegex, positionRegex, roleRegex,
} from "../utils/regex.schema.js";

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
  birth_date: Joi.string()
    .messages({
      "string.empty": "La date de naissance est requis",
    })
    .required(),
  nationality: Joi.string()
    .messages({
      "string.empty": "La nationalité est requis",
    })
    .min(2)
    .required(),
  genre: Joi.string()
    .pattern(genreRegex)
    .messages({
      "string.empty": "Le genre est requis",
      "string.pattern.base": "Le genre donné ne correspond pas",
    })
    .required(),
  height: Joi.number()
    .integer()
    .messages({
      "number.base": "La taille doit être un nombre",
      "number.integer": "La taille doit être un entier",
    })
    .required(),
  weight: Joi.number()
    .integer()
    .messages({
      "number.base": "Le poids doit être un nombre",
      "number.integer": "Le poids doit être un entier",
    })
    .required(),
  strong_foot: Joi.string()
    .pattern(footRegex)
    .messages({
      "string.empty": "Le pied fort est requis",
      "string.pattern.base": "Le pied fort donné ne correspond pas",
    })
    .required(),
  position: Joi.string()
    .pattern(positionRegex)
    .messages({
      "string.empty": "La position est requise",
      "string.pattern.base": "La position donnée ne correspond pas",
    })
    .required(),
  avatar: Joi.string(),
}).required();
