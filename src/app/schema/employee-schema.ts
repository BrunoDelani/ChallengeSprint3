import moment from 'moment';
import { Schema, model } from 'mongoose';
import EmployeeInterface from '../interface/employee-interface';

const EmployeeSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  office: { type: String, enum: ['gerente', 'vendedor', 'caixa'], required: true },
  birthday: { type: Date, required: true },
  situation: { type: String, default: 'active' }
}, {
  toJSON: {
    transform: function (doc, ret) {
      return {
        id: ret._id,
        name: ret.name,
        cpf: ret.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
          function (regex, argumento1, argumento2, argumento3, argumento4) {
            return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
          }),
        office: ret.office,
        birthday: moment(ret.birthday).format('DD/MM/YYYY'),
        situation: ret.situation
      };
    }
  }
});

export default model<EmployeeInterface>('employee', EmployeeSchema);
