const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string(),

    first_name: Joi.string(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>\\/?]{8,}$'))
        .message('Le mot de passe doit contenir au moins 8 caractères et inclure des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.'),


    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ name: 'cantona', first_name: 'eric' });




try {
    const value = await schema.validateAsync({ name: 'cantona', first_name:'eric' });

    console.log("Validation réussie :", value);
}
catch (err) { }