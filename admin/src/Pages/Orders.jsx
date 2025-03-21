import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/hitech/order/list",
        {},
        { headers: { Authorization: token } }
      );
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
        { headers: { Authorization: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const downloadPDF = async (order) => {
    const doc = new jsPDF();
    doc.text("Order Details", 10, 10);
    doc.text(`Customer: ${order.name}`, 10, 20);
    doc.text(`Address: ${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState}`, 10, 30);
    doc.text(`Phone: ${order.phone}`, 10, 40);
    doc.text(`Amount: ${currency} ${order.amount}`, 10, 50);
    doc.text(`Status: ${order.status}`, 10, 60);

    // Convert order image to canvas and add to PDF
    const img = new Image();
    img.src = assets.parcel_icon;
    img.onload = () => {
      doc.addImage(img, "PNG", 10, 70, 40, 40);
      doc.save("order-details.pdf");
    };
  };

  const printOrder = (order) => {
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h3 {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .order-details {
              max-width: 400px;
              margin: auto;
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            p {
              font-size: 14px;
              margin: 8px 0;
            }
            .highlight {
              font-weight: bold;
              color: #000;
            }
          </style>
        </head>
        <body>
          <div class="order-details">
            <h3>Order Details</h3>
            <p><span class="highlight">Customer:</span> ${order.name}</p>
            <p><span class="highlight">Address:</span> ${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState}</p>
            <p><span class="highlight">Phone:</span> ${order.phone}</p>
            <p><span class="highlight">Amount:</span> ${currency} ${order.amount}</p>
            <p><span class="highlight">Status:</span> ${order.status}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
  <h3 className="text-xl font-semibold mb-4">Order Page</h3>
  <div className="space-y-4">
    {orders.map((order, index) => (
      <div
        className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
        key={index}
      >
        <img className="w-14 h-14" src={assets.parcel_icon} alt="" />

        <div className="flex-1 px-4">
          {order.items.map((item, i) => (
            <p key={i} className="text-sm text-gray-700">
              {item.name} x {item.quantity} <span className="font-medium">{item.size}</span>
            </p>
          ))}
          <p className="text-lg font-semibold text-gray-800">{order.name}</p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress}, {order.shippingCity}, {order.shippingState}
          </p>
          <p className="text-sm text-gray-600">{order.phone}</p>
        </div>

        <p className="text-lg font-bold text-gray-900">
          {currency} {order.amount}
        </p>

        <select
          onChange={(event) => statusHandler(event, order._id)}
          value={order.status}
          className="px-3 m-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => deleteOrderHandler(order._id)}
            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={() => printOrder(order)}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Print
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
