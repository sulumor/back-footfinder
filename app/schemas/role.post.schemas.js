import Joi from "joi";

const schema = Joi.object({
    code_role: Joi.string(),
    
    wording: Joi.string(),

        access_token: Joi.string()
        .alphanum(3)
        .min(10)
        .max(100)
        .required()
        .message('Le jeton d\'accès doit être une chaîne alphanumérique d\'une longueur minimale de 10 caractères et maximale de 100 caractères.')
})
   
    

schema.validate({ code_role: 14, wording: 'the center front' });



try {
    const value = await schema.validateAsync({ id: 14, wording: 'the center front' });

    console.log("Validation réussie :", value);
}
catch (err) { 
console.error('Une erreur de validation est survenue :', err);
}