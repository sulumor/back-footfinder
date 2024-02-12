import Joi from "joi";
import { logPasswordRegex } from "../utils/regex.schema.js";

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .required(),
  password: Joi.string()
    .pattern(logPasswordRegex)
    .message("Le mot de passe doit contenir au moins 8 caractères")
    .required(),
}).required();
