// Import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const alcoholSchema = Joi.object({
    name: Joi.string().alter(variationPost),
    describe: Joi.string().alter(variationPost),
    localisation: Joi.string().alter(variationPost),
    category: Joi.string().alter(variationPost),
    nose: Joi.string(),
    brand: Joi.string().alter(variationPost),
});

const postAlcoholSchema = alcoholSchema.tailor('post');

exports.alcoholSchema = alcoholSchema;
exports.postAlcoholSchema = postAlcoholSchema;
