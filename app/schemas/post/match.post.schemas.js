import Joi from "joi";
import { scoreRegex } from "../utils/regex.schema.js";

export default Joi.object({
  homeTeam: Joi.number()
    .integer()
    .required(),
  awayTeam: Joi.number()
    .integer()
    .required(),
  score: Joi.string()
    .pattern(scoreRegex),
}).required();
