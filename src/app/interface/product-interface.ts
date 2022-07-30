import mongoose from 'mongoose';

interface ProductInterface extends mongoose.Document {
  id?: String,
  name?: String,
  category?: String,
  price?: Number,
  employee_id?: mongoose.Schema.Types.ObjectId
}

export default ProductInterface;
