import Joi from "joi";

const schema = Joi.object({
    id: Joi.number()
        .integer()
        .min(3)
        .max(30)
        .required(),
    
    score: Joi.number()
        .integer()
        .min(1)
        .max(1000),

        
        access_token: Joi.string()
        .alphanum(3)
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
   
    

schema.validate({ id: 14, score: 2-0 });


schema.validate({});


try {
    const value = await schema.validateAsync({ id: 14, score: 2-0 });
    console.log("Validation réussie :", value);
}
catch (err) { 
console.error('Une erreur de validation est survenue :', err);
}