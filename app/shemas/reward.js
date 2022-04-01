// Import
const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
};

const rewardSchema = Joi.object({
    name: Joi.string().alter(variationPost),
    describe: Joi.string().alter(variationPost),
});

const postRewardSchema = rewardSchema.tailor('post');

exports.rewardSchema = rewardSchema;
exports.postRewardSchema = postRewardSchema;
