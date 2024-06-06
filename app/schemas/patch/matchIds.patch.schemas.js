import Joi from "joi";

export default Joi.object({
  matchId: Joi.number().integer().required(),
}).required();
