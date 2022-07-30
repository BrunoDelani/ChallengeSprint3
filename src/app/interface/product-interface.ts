import mongoose from 'mongoose';

interface ProductInterface extends mongoose.Document {
  id?: string,
  name?: string,
  category?: string,
  price?: number,
  employee_id?: mongoose.Schema.Types.ObjectId
}

export default ProductInterface;
