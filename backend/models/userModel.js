import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    phoneNumber: { type: String, required: true},
    orders: { type: Array, default: [] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;