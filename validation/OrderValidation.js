const Joi = require('joi');

const createOrderSchema = Joi.object({
  shippingAddress: Joi.string().min(5).max(500).required()
});

const updateOrderSchema = Joi.object({
  shippingAddress: Joi.string().min(5).max(500).optional(),
  status: Joi.string()
    .valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled')
    .optional()
}).or('shippingAddress', 'status');


function validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const details = error.details.map(d => d.message);
        return res.status(400).json({ message: 'Validation error', details });
      }
      next();
    };
  }
  

module.exports = { validateCreateOrder: validate(createOrderSchema), validateUpdateOrder: validate(updateOrderSchema) };