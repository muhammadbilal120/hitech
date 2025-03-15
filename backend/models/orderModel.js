import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: String, required: false },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: false },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: false },
    payment: { type: Boolean, required: false, default: false },
    date: { type: Number, required: false },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    shippingAddress: { type: String, required: false, default: '' },
    shippingCity: { type: String, required: false, default: '' },
    shippingState: { type: String, required: false, default: '' },
})

const orderModel = mongoose.models.order || mongoose.model('Order', orderSchema)
export default orderModel