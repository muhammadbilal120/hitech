import mongoose from "mongoose";

// SCHEMA
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  oldPrice: { type: Number },
  newPrice: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  neckType: { type: String, required: true },
  bestSeller: { type: Boolean },
  quantity: { type: Number, required: true },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);
export default productModel;
