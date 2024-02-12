import Joi from "joi";

const lettersRegex = /dsdd/;

export default Joi.object({
  last_name: Joi.string()
    .min(2)
    .pattern()
    .required(),
  first_name: Joi.string(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io", "fr", "org", "eu"] } }),
  password: Joi.string()
    .pattern(lettersRegex)
    .message("Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux."),

  repeat_password: Joi.ref("password"),

}).required();
