import Joi from "joi";

export default Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 1 }),
  avatar: Joi.string(),
  club: Joi.string(),
  city: Joi.string(),
}).min(1).required();
