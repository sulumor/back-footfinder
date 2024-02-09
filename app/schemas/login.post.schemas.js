import Joi from "joi";

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>\\/?]{8,}$'))
        .message('Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.'),

    repeat_password: Joi.ref('password'),

    access_token: Joi.string()
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
    .with('password', 'repeat_password')
    .xor('password', 'access_token');

const validateAsyncData = async (data) => {
    try {
        const value = await schema.validateAsync(data);
        console.log("Validation réussie :", value);
    } catch (err) {
        console.error('Une erreur de validation est survenue :', err);
    }
};

validateAsyncData({ email: 'example@example.com', password: 'Password123!', repeat_password: 'Password123!', access_token: 'ABC123xyz' });
