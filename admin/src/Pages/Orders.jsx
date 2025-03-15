import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import toast  from 'react-toastify'
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  // const [orders, setOrders] = useSt()
  const [orders, setOrders] = useState([]);
  // console.log(orders)
  const fetchAllOrders = async (req, res) => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/hitech/order/list",
        {},
        {
          headers: { Authorization: token },
        }
      );
      // console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const status = event.target.value;
      const response = await axios.post(
        backendUrl + "/api/hitech/order/status",
        { orderId, status },
        {
          headers: { Authorization: token },
        }
      );
      // console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(response.data.message);
    }
  };
  const deleteOrderHandler = async (orderId) => {
    try {
        const response = await axios.post(
            `${backendUrl}/api/hitech/order/delete`,
            { orderId },
            { headers: { Authorization: token } }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            fetchAllOrders(); // Refresh orders after deletion
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
        <h3>Order Page</h3>
        <div>
            {orders.map((order, index) => (
                <div
                    className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                    key={index}
                >
                    <img className="w-12" src={assets.parcel_icon} alt="" />
                    <div>
                        {order.items.map((item, i) => (
                            <p key={i}>
                                {item.name} x {item.quantity} <span>{item.size}</span>
                            </p>
                        ))}
                        <p className="mt-3 mb-2 font-medium">{order.name}</p>
                        <p>{order.shippingAddress}, {order.shippingCity}, {order.shippingState}</p>
                        <p>{order.phone}</p>
                    </div>
                    <div>
                        <p>Items: {order.items.length}</p>
                        {/* <p>Method: {order.paymentMethod}</p> */}
                        <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <p>{currency} {order.amount}</p>
                    <select
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                        className="p-2 font-semibold"
                    >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    </div>
);
};

export default Orders;
