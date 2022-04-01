// import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const userSchema = Joi.object({
    first_name: Joi.string().alter(variationPost),
    last_name: Joi.string().alter(variationPost),
    mail: Joi.string().alter(variationPost),
    password: Joi.string().alter(variationPost),
    pseudo: Joi.string().alter(variationPost),
    role: Joi.string(),

});

const postUserSchema = userSchema.tailor('post');

exports.userSchema = userSchema;
exports.postUserSchema = postUserSchema;
