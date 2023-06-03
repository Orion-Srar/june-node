const Joi =  require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    age: Joi.number()
        .min(0)
        .max(80)
        .required(),
    gender: Joi.string()
        .required()
});


module.exports ={
    schema
}