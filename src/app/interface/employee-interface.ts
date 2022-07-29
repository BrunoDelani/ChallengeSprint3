import mongoose from 'mongoose';

interface EmployeeInterface extends mongoose.Document {
  id?: String,
  name?: String,
  cpf?: String,
  office?: String,
  birthday?: Date,
  situation?: String
}

export default EmployeeInterface;
