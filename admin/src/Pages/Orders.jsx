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

  const downloadInvoice = async (order) => {
    const doc = new jsPDF();
  
    // Company Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Hitech Official", 70, 10);
    
    doc.setFontSize(18);
    doc.text("Invoice", 90, 20);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer: ${order.name}`, 10, 40);
    doc.text(`Phone: ${order.phone}`, 10, 50);
    doc.text(`Address: ${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState}`, 10, 60);
    doc.text(`Status: ${order.status}`, 10, 70);
  
    // Order Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Order Details", 10, 85);
  
    // Table Headers with Borders
    let y = 95;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.rect(10, y, 180, 10);
    doc.text("Product", 15, y + 7);
    doc.text("Qty", 90, y + 7);
    doc.text("Price", 120, y + 7);
    doc.text("Total", 160, y + 7);
    y += 15;
  
    let totalAmount = 0;
  
    order.items.forEach((item) => {
      if (!item.newPrice || !item.quantity) {
        console.error("Item price or quantity is missing:", item);
      }
  
      const quantity = item.quantity ? Number(item.quantity) : 0;
      const price = item.newPrice ? Number(item.newPrice) : 0;
      const itemTotal = quantity * price;
      totalAmount += itemTotal;
  
      doc.setFont("helvetica", "normal");
      doc.rect(10, y - 5, 180, 10);
      doc.text(item.name, 15, y);
      doc.text(`${quantity}`, 90, y);
      doc.text(`${currency} ${price.toFixed(2)}`, 120, y);
      doc.text(`${currency} ${itemTotal.toFixed(2)}`, 160, y);
      y += 10;
    });
  
    // Grand Total with Styling
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Grand Total:", 120, y);
    doc.text(`${currency} ${totalAmount.toFixed(2)}`, 160, y);
  
    // Save Invoice
    doc.save(`invoice_${order._id}.pdf`);
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
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            table, th, td {
              border: 1px solid #ddd;
              text-align: left;
            }
            th, td {
              padding: 8px;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <div class="order-details">
            <h3>Order Details</h3>
            <p><span class="highlight">Customer:</span> ${order.name}</p>
            <p><span class="highlight">Address:</span> ${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState}</p>
            <p><span class="highlight">Phone:</span> ${order.phone}</p>
            <p><span class="highlight">Status:</span> ${order.status}</p>
  
            <h3>Order Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${currency} ${item.newPrice.toFixed(2)}</td>
                    <td>${currency} ${(item.quantity * item.newPrice).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
  
            <h3>Total Amount: ${currency} ${order.amount.toFixed(2)}</h3>
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
              <button
                onClick={() => downloadInvoice(order)}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Download Invoice
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Orders;
