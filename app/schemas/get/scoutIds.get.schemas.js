import Joi from "joi";

export default Joi.object({
  id: Joi.number().integer().required(),
  scoutId: Joi.number().integer().required(),
}).required();
