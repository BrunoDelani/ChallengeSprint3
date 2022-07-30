import Joi from 'joi';

export default (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    category: Joi.string().required(),
    price: Joi.string().required(),
    employee_id: Joi.string().required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Bad Request',
      details: error.details.map((detail) => ({
        name: detail.path.join('.'),
        description: detail.message
      })
      )
    }
    );
  };
  return next();
};
