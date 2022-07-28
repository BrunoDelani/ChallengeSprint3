import mongoose from 'mongoose';

interface EmployeeInterface extends mongoose.Document {
  id?: String,
  name?: String,
  cpf?: String,
  office?: Number,
  birthday?: String,
  situation?: String
}

export default EmployeeInterface;
