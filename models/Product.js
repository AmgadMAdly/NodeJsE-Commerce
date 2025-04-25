const Joi = require('joi');
const mongoose = require('mongoose');

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid categoryId');
  }
  return value;
};

const productSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow('', null),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
  image: Joi.string().uri().optional(), 
  categoryId: Joi.string().custom(isValidObjectId).required()
});

module.exports = { productSchema };
