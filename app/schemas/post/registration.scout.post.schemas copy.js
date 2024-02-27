import Joi from "joi";
import { roleRegex } from "../utils/regex.schema.js";

export default Joi.object({
  id: Joi.number().integer().required(),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .required(),
  role: Joi.string().pattern(roleRegex).required(),
  club: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  avatar: Joi.string(),
}).required();
