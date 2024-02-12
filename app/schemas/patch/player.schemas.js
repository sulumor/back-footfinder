import Joi from "joi";

export default Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 1 }),
  birth_date: Joi.date().timestamp(),
  nationality: Joi.string(),
  avatar: Joi.string(),
  genre: Joi.string(),
  strong_foot: Joi.string(),
}).min(1).required();
