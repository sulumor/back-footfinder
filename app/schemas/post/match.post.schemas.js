import Joi from "joi";

export default Joi.object({
  homeTeam: Joi.number()
    .integer()
    .required(),
  awayTeam: Joi.number()
    .integer()
    .required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
}).required();
