import { useContext, useEffect, useId, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext); // Token from context
  const [orderData, setOrderData] = useState([]);  

  const phone = localStorage.getItem("phone");

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.warn("Token is missing. Cannot fetch orders.");
        return;
      }
  
      const response = await axios.post(
        `${backendUrl}/api/hitech/order/userorders`,
        {phone }, // No need to send `phone` in the body
        { headers: { Authorization: token } }
      );
  
      // console.log("API Response:", response.data);
  
      if (response.data.success) {
        // console.log(response.data)
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        // console.log("Orders set in state:", allOrdersItem);
      } else {
        console.warn("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]); // Only fetch when the token changes

  return (
    <div className="border-t pt-16 mb-28">
  <div className="text-2xl font-semibold text-gray-800">
    <Title text1={"MY"} text2={"ORDERS"} />
  </div>
  <div>
    {orderData.map((item, index) => (
      <div
        key={index}
        className="py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* Product Details */}
        <div className="flex gap-6 items-start text-sm sm:text-base">
          <img className="w-16 sm:w-20 object-cover rounded-md shadow-md" src={item.image[0]} alt={item.name} />
          <div>
            <p className="font-medium text-lg text-gray-900">{item.name}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
              <p className="font-semibold">
                {currency}
                {item.price}
              </p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              {/* <p className="text-sm">Size: {item.size}</p> */}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Date:
              <span className="text-gray-400">
                {new Date(item.date).toDateString()}
              </span>
            </p>
          </div>
        </div>

        {/* Status & Action */}
        <div className="md:w-1/3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          <div className="flex items-center gap-2">
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
            <p className="text-sm md:text-base font-medium text-gray-600">{item.status}</p>
          </div>
          <button
  onClick={loadOrderData}
  className="mt-4 md:mt-0 bg-[#811C30] text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-[#811C35] transition duration-300"
>
  Track order
</button>

        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
