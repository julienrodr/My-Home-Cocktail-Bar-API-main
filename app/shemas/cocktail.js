// Import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const cocktailSchema = Joi.object({
    name: Joi.string().alter(variationPost),
    describe: Joi.string().alter(variationPost),
    recipe: Joi.string().alter(variationPost),
    category: Joi.string().alter(variationPost),
    user_id: Joi.number().alter(variationPost),
});

const postCocktailSchema = cocktailSchema.tailor('post');

exports.cocktailSchema = cocktailSchema;
exports.postCocktailSchema = postCocktailSchema;
