import express from "express";
import { placeOrder, allOrders, userOrders, updateStatus, deleteOrder } from "../controllers/orderController.js";
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();
console.log("payen order router j");
// Admin features
orderRouter.post("/list", authUser, allOrders);
orderRouter.post("/status", authUser, updateStatus);

// payment Features
orderRouter.post("/place", placeOrder);
// orderRouter.post("/stripe", authUser, placeOrderStripe);
// orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user Feature
orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/delete", authUser, deleteOrder);


export default orderRouter;