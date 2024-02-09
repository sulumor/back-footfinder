import Joi from "joi";

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>\\/?]{8,}$'))
        .message('Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.'),


})


const validateAsyncData = async (data) => {
    try {
        const value = await schema.validateAsync(data);
        console.log("Validation réussie :", value);
    } catch (err) {
        console.error('Une erreur de validation est survenue :', err);
    }
};

validateAsyncData({ email: 'example@example.com', password: 'Password123!', repeat_password: 'Password123!', access_token: 'ABC123xyz' });
