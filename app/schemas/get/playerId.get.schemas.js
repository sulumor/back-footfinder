import Joi from "joi";

export default Joi.object({
  playerId: Joi.number().integer().required(),
}).required();
