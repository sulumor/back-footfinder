import Joi from "joi";

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>\\/?]{8,}$'))
        .message('Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.'),

    repeat_password: Joi.ref('password'),

    
    code_players: Joi.number()
        .integer()
        .min(1)
        .max(1000),

        nationality: Joi .string(),

        gender: Joi .string(),

        number_of_matches_played: Joi .number()
            .integer()
            .min(0)
            .max(100),



    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2090),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        access_token: Joi.string()
        .alphanum(3)
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });

schema.validate({});


try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });

    console.log("Validation réussie :", value);
}
catch (err) { 
console.error('Une erreur de validation est survenue :', err);
}