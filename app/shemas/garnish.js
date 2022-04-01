// Import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const garnishSchema = Joi.object({
    name: Joi.string().alter(variationPost),
    describe: Joi.string().alter(variationPost),
    category: Joi.string().alter(variationPost),
});

const postGarnishSchema = garnishSchema.tailor('post');

exports.garnishSchema = garnishSchema;
exports.postGarnishSchema = postGarnishSchema;
