import Joi from "joi";

export default Joi.object({
  id: Joi.number().integer().required(),
  matchId: Joi.number().integer().required(),
}).required();
