import Joi from "joi";
import { genderRegex, nationalityRegex, positionRegex } from "../utils/regex.schema.js";

export default Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 1 }),
  birth_date: Joi.string(),
  nationality: Joi.string().pattern(nationalityRegex),
  avatar: Joi.string(),
  gender: Joi.string()
    .pattern(genderRegex),
  strong_foot: Joi.boolean(),
  position: Joi.string().pattern(positionRegex),
  height: Joi.number().integer(),
  weight: Joi.number().integer(),
}).min(1).required();
