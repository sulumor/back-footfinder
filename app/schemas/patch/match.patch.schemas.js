import Joi from "joi";
import { scoreRegex } from "../utils/regex.schema.js";

export default Joi.object({
  homeTeam: Joi.number()
    .integer(),
  awayTeam: Joi.number()
    .integer(),
  score: Joi.string()
    .pattern(scoreRegex),
}).min(1).required();
