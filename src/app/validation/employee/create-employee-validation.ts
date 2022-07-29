import Joi from 'joi';
import convertDate from '../../utils/convertDate';
import validateCPF from '../../utils/validateCPF';

export default (req, res, next) => {
  if (req.body.birthday) {
    req.body.birthday = convertDate(req.body.birthday);
  }
  try {
    req.body.cpf = req.body.cpf.replace(/[^0-9]/g, '');
    const teste = validateCPF(req.body.cpf);
    if (!teste) {
      return res.status(400).json({ message: 'Sent CPF field is invalid' });
    }
  } catch (error) {
    console.log(error);
  }
  const schema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    office: Joi.string().valid('gerente', 'vendedor', 'caixa').required(),
    birthday: Joi.date().max('now').required()
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
