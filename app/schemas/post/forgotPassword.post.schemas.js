import Joi from "joi";

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .messages({
      "string.empty": "L'email est requis",
      "string.email": "L'email donné n'est pas valide",
    })
    .required(),
}).required();
