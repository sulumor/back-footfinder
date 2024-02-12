import Joi from "joi";

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9\W]{8,}$/)
    .message("Le mot de passe doit contenir au moins 8 caractères")
    .required(),
}).required();
