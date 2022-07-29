import Joi from 'joi';

export default (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    office: Joi.string().valid('gerente', 'vendedor', 'caixa').required(),
    situation: Joi.string().valid('active', 'deactivate').required()
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
