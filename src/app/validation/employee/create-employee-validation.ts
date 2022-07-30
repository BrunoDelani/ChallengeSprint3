import Joi from 'joi';
import convertDate from '../../utils/convertDate';
import validateCPF from '../../utils/validateCPF';

export default (req, res, next) => {
  if (req.body.birthday) {
    req.body.birthday = convertDate(req.body.birthday);
  }
  let teste: Boolean = false;
  if (req.body.cpf) {
    req.body.cpf = req.body.cpf.replace(/[^0-9]/g, '');
    teste = validateCPF(req.body.cpf);
  }
  if (!teste) {
    return res.status(400).json({
      message: 'Bad Request',
      details: [
        { message: 'Sent CPF field is invalid' }
      ]
    });
  }
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    cpf: Joi.string().min(11).max(11).required(),
    office: Joi.string().valid('gerente', 'vendedor', 'caixa').required(),
    birthday: Joi.date().less('now').required()
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
