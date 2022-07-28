import { Schema, model } from 'mongoose';
import EmployeeInterface from '../interface/employee-interface';

const EmployeeSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  office: { type: Number, required: true },
  birthday: { type: String, required: true },
  situation: { type: String }
});

export default model<EmployeeInterface>('employee', EmployeeSchema);
