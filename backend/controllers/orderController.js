import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
import nodemailer from "nodemailer";

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, order } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            name: `${order.firstName} ${order.lastName}`,
            phone: order.phone,
            email: order.email,
            shippingAddress: order.street,
            shippingCity: order.city,
            shippingState: order.state,
            date: new Date(),
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        for (const item of items) {
            const product = await productModel.findById(item._id);
            if (product) {
                if (product.quantity >= item.quantity) {
                    product.quantity -= item.quantity;
                } else {
                    return res.status(400).send(`Not enough stock for ${product.name}`);
                }
                await product.save();
            } else {
                return res.status(404).send(`Product not found: ${item.productId}`);
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Email Sending
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bilalrabbani12120@gmail.com",
                pass: "nfnr gfmj tdpk yitv", // Store in ENV file!
            },
        });

        let mailOptions = {
            to: "bilalrabbani12120@gmail.com",
            subject: "Order Confirmation",
            text: `Hello HITECH ADMIN,\n\nA new order has been placed successfully! 🎉\n\nOrder Details:\nTotal Amount: $${amount}\nShipping Address: ${order.street}, ${order.city}, ${order.state}\n\nThank you for shopping with us!`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.log("Email Error: ", emailError);
        }

        res.json({ success: true, message: "Order placed & Email sent successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.json({ success: false, message: "Phone number is required" });
        }
        const orders = await orderModel.find({ phone });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const placeOrderStripe = async (req, res) => {
    // Your existing Stripe order placement logic
};

const placeOrderRazorpay = async (req, res) => {
    // Your existing Razorpay order placement logic
};

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    deleteOrder
};
