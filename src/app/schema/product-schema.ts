import { Schema, model } from 'mongoose';
import ProductInterface from '../interface/product-interface';

const ProductSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  employee_id: { type: Schema.Types.ObjectId, ref: 'employee', required: true }
}, {
  toJSON: {
    transform: function (doc, ret) {
      return {
        id: ret._id,
        name: ret.name,
        category: ret.category,
        price: ret.price.toString(),
        employee_id: ret.employee_id
      };
    }
  }
}
);

export default model<ProductInterface>('product', ProductSchema);
