import Joi from "joi";
import { fitnessRegex } from "../utils/regex.schema.js";

export default Joi.object({
  assists: Joi.number().integer(),
  goals_scored: Joi.number().integer(),
  minutes_played: Joi.number().integer(),
  red_card: Joi.number().integer(),
  yellow_card: Joi.number().integer(),
  stops: Joi.number().integer(),
  goals_conceded: Joi.number().integer(),
  fitness: Joi.string().pattern(fitnessRegex),

}).min(1).required();
