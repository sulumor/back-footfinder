import Joi from "joi";
import { roleRegex } from "../utils/regex.schema.js";

export default Joi.object({
  role: Joi.string().pattern(roleRegex).required(),
}).required();
