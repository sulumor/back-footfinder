import Joi from "joi";
import { genderRegex, nationalityRegex } from "../utils/regex.schema.js";

export default Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 1 }),
  avatar: Joi.string(),
  club: Joi.string(),
  city: Joi.string(),
  nationality: Joi.string().pattern(nationalityRegex),
  gender: Joi.string().pattern(genderRegex),
}).min(1).required();
