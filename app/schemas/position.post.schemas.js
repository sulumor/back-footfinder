import Joi from "joi";

const schema = Joi.object({
    code_poste: Joi.number()
        .min(3)
        .max(30)
        .required(),
    
    wording: Joi.string(),

        
        access_token: Joi.string()
        .alphanum(3)
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
   
    

schema.validate({ id: 14, wording: 'the center front' });

schema.validate({});
 

try {
    const value = await schema.validateAsync({ id: 14, wording: 'the center front' });

    console.log("Validation réussie :", value);
}
catch (err) { 
console.error('Une erreur de validation est survenue :', err);
}