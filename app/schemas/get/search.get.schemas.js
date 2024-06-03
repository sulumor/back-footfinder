import Joi from "joi";
import {
  footRegex, genreRegex, lettersRegex, positionRegex,
} from "../utils/regex.schema.js";

export default Joi.object({
  lastname: Joi.string().pattern(lettersRegex),
  firstname: Joi.string().pattern(lettersRegex),
  nationality: Joi.string(),
  gender: Joi.string().pattern(genreRegex),
  strong_foot: Joi.string().pattern(footRegex),
  position: Joi.string().pattern(positionRegex),
  number_of_matches_played: Joi.number().integer(),

}).min(1).required();
