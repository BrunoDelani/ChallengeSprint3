import Joi from 'joi';

export default (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    office: Joi.string().valid('gerente', 'vendedor', 'caixa').required(),
    birthday: Joi.string().required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(
      error.details.map((detail) => ({
        name: detail.path.join('.'),
        description: detail.message
      }))
    );
  };
  return next();
};
