import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "LIVE NOW", // Default text
  },
});

const marqueeModal = mongoose.models.Marquee || mongoose.model('Marquee', marqueeSchema)
export default marqueeModal
