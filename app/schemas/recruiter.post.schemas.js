import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern()
    .message("Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux."),

  repeat_password: Joi.ref("password"),

  code_recruiter: Joi.number()
    .integer()
    .min(1)
    .max(1000),

  club: Joi.string(),

  town: Joi.string(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  access_token: Joi.string()
    .alphanum()
    .min(10)
    .max(100)
    .required()
    .message("Le jeton d'accès doit être une chaîne alphanumérique d'une longueur minimale de 10 caractères et maximale de 100 caractères."),

})
  .with("username", "birth_year")
  .xor("password", "access_token")
  .with("password", "repeat_password");

schema.validate({ username: "abc", club: "psg" });

try {
  const value = await schema.validateAsync({ username: "abc", club: "psg" });

  console.log("Validation réussie :", value);
} catch (err) {
  console.error("Une erreur de validation est survenue :", err);
}
