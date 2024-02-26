import Joi from "joi";
import { fitnessRegex, scoreRegex } from "../utils/regex.schema.js";

export default Joi.object({
  assists: [Joi.number().integer(), null],
  goals_scored: [Joi.number().integer(), null],
  minutes_played: Joi.number().integer(),
  red_card: Joi.number().integer(),
  yellow_card: Joi.number().integer(),
  stops: [Joi.number().integer(), null],
  goals_conceded: [Joi.number().integer(), null],
  fitness: Joi.string().pattern(fitnessRegex),
  score: Joi.string().pattern(scoreRegex),
}).min(1).required();
