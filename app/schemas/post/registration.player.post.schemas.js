import Joi from "joi";
import {
  footRegex, genreRegex, positionRegex, roleRegex,
} from "../utils/regex.schema.js";

export default Joi.object({
  id: Joi.number().integer().required(),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .required(),
  role: Joi.string().pattern(roleRegex).required(),
  birth_date: Joi.string().required(),
  nationality: Joi.string().min(2).required(),
  genre: Joi.string().pattern(genreRegex).required(),
  height: Joi.number().integer().required(),
  weight: Joi.number().integer().required(),
  strong_foot: Joi.string().pattern(footRegex).required(),
  position: Joi.string().pattern(positionRegex).required(),
  avatar: Joi.string(),
}).required();
