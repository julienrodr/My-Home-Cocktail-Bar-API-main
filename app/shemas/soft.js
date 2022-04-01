// Import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const softSchema = Joi.object({
    name: Joi.string().alter(variationPost),
    describe: Joi.string().alter(variationPost)
});

const postSoftSchema = softSchema.tailor('post');

exports.softSchema = softSchema;
exports.postSoftSchema = postSoftSchema;
