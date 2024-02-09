import Joi from "joi";

const schema = Joi.object({
    code_stats: Joi.number()
        .integer()
        .min(3)
        .max(30),

    assists: Joi.number()
        .integer()
        .min(0)
        .max(100),

    goals_scored: Joi.number()
        .integer()
        .min(1)
        .max(1000),

    minutes_played: Joi.number()
        .integer()
        .min(0)
        .max(90),

    red_card: Joi.string(),

    red_yellow: Joi.string(),

    stops: Joi.number()
        .integer()
        .min(0)
        .max(100),

    goals_conceded: Joi.number()
        .integer()
        .min(0)
        .max(20),

    fitness: Joi.string(),

    access_token: Joi.string()
        .alphanum()
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
});

schema.validate({ code_stats: 10, assists: 5, goals_scored: 20, minutes_played: 60, red_card: 'Yes', red_yellow: 'No', stops: 15, goals_conceded: 2, fitness: 'Good', access_token: 'ABC123xyz' })
    .then(value => console.log("Validation réussie :", value))
    .catch(error => console.error("Erreur de validation :", error.message));
