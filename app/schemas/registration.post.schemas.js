import Joi from "joi";

const lettersRegex = /[A-Za-zÀ-ÿ]/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

export default Joi.object({
  lastname: Joi.string()
    .min(2)
    .pattern(lettersRegex)
    .required(),
  firstname: Joi.string()
    .min(2)
    .pattern(lettersRegex)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .message("Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.")
    .required(),
  confirmedPassword: Joi.ref("password")
    .required(),
}).required();
