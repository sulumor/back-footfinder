import Joi from "joi";

const schema = Joi.object({
    team: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    code_team: Joi.number()
        .integer()
        .min(1)
        .max(1000),

        club_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        logo: Joi.string(),

        address: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        number_of_matches_played: Joi.number()
            .integer()
            .min(0)
            .max(100),

            postal_code: Joi.string()
            .pattern(/^\d{5}$/)
            .message('Le code postal doit être composé de 5 chiffres.')
            .required(),

            town: Joi.string(),
      
            longitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),

            latitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),

        

        access_token: Joi.string()
        .alphanum(3)
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
    


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { 
console.error('Une erreur de validation est survenue :', err);
}