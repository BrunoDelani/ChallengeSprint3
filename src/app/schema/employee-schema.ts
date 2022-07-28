import { Schema, model } from 'mongoose';
import EmployeeInterface from '../interface/employee-interface';

const EmployeeSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  office: { type: String, enum: ['gerente', 'vendedor', 'caixa'], required: true },
  birthday: { type: Date, required: true },
  situation: { type: String, default: 'active' }
});

export default model<EmployeeInterface>('employee', EmployeeSchema);
