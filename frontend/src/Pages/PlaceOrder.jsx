import { useContext, useState } from "react";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const provinces = {  Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Islamabad", "Gujranwala"],};

const PlaceOrder = () => {
  const { cartItems, setCartItems, products, getCartAmount, delivery_fee, navigate, backendUrl, token, } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [selectedState, setSelectedState] = useState("Punjab"); // Default state
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "", // Default city based on selected state
    state: "Punjab", // Default state
    zipCode: "",
    country: "Pakistan", // Set Pakistan as the default country 
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setFormData((data) => ({
      ...data,
      state,
      city: provinces[state][0],
    }));
  };
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        let orderItems = [];

        // Loop through cartItems and extract all products
        for (const productId in cartItems) {
            if (cartItems[productId] > 0) {
                const productInfo = structuredClone(
                    products.find((product) => product._id === productId)
                );
                if (productInfo) {
                    productInfo.quantity = cartItems[productId];
                    orderItems.push(productInfo);
                }
            }
        }

        if (orderItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        let orderData = {
            order: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee,
        };

        if (method === "cod") {
            localStorage.setItem("phone", formData.phone);
            const response = await axios.post(
                `${backendUrl}/api/hitech/order/place`,
                orderData,
                {
                    headers: { Authorization: token },
                }
            );

            if (response.data.success) {
                // Clear cart on success
                const updatedCart = structuredClone(cartItems);

                // Set cart items to zero locally
                orderItems.forEach((item) => {
                    const { _id } = item;
                    if (updatedCart[_id]) {
                        updatedCart[_id] = 0;
                    }
                });

                setCartItems(updatedCart);

                // Call updateCart for each item to sync with the backend
                for (const item of orderItems) {
                    const { _id } = item;
                    await axios.post(
                        `${backendUrl}/api/hitech/cart/update`,
                        { itemId: _id, quantity: 0 },
                        {
                            headers: { Authorization: token },
                        }
                    );
                }
                toast.success(response.data.message);
                navigate("/orders");
            } else {
                toast.error(response.data.message);
            }
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to place order. Please try again.");
    }
};
 

  return (
    <form
  onSubmit={onSubmitHandler}
  className="flex flex-col sm:flex-row justify-between gap-6 pt-6 sm:pt-16 min-h-[80vh] py-11 mb-5"
>
  <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
    <div className="text-2xl sm:text-3xl font-semibold text-gray-700 my-4">
      <Title text1={"DELIVERY"} text2={"INFORMATION"} />
    </div>
    <div className="flex gap-4 sm:gap-6">
      <input
        required
        onChange={onChangeHandler}
        name="firstName"
        value={formData.firstName}
        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="First Name"
      />
      <input
        required
        onChange={onChangeHandler}
        name="lastName"
        value={formData.lastName}
        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Last Name"
      />
    </div>
    <input
      required
      onChange={onChangeHandler}
      name="email"
      value={formData.email}
      className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="email"
      placeholder="Enter Email"
    />
    <input
      required
      onChange={onChangeHandler}
      name="street"
      value={formData.street}
      className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Street"
    />
    <div className="flex gap-4 sm:gap-6">
      <select
        required
        onChange={handleStateChange}
        name="state"
        value={formData.state}
        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.keys(provinces).map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
      <select
        required
        onChange={onChangeHandler}
        name="city"
        value={formData.city}
        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {provinces[selectedState].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
    <input
      required
      onChange={onChangeHandler}
      name="zipCode"
      value={formData.zipCode}
      className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="number"
      placeholder="Zipcode"
    />
    <input
      required
      name="country"
      value={formData.country}
      className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      readOnly
    />
    <input
      required
      onChange={onChangeHandler}
      name="phone"
      value={formData.phone}
      className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="number"
      placeholder="Phone"
    />
  </div>
  <div className="mt-8 flex flex-col justify-between">
    <div className="min-w-[320px] mt-4 sm:mt-8">
        <CartTotal />
    </div>
    <div className="mt-12">
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        <div className="flex gap-4 flex-col lg:flex-row mt-6">
            <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all hover:shadow-xl hover:bg-gray-100 hover:border-green-500"
            >
                <p
                    className={`w-6 h-6 border-2 rounded-full ${method === "cod" ? "bg-green-500" : "bg-gray-300"}`}
                ></p>
                <p className="text-gray-700 font-semibold text-md">
                    CASH ON DELIVERY
                </p>
            </div>
        </div>
        <div className="w-full text-end mt-8">
            <button
                type="submit"
                style={{ background: isLoading ? "#6DAA90" : "#8ACFB6" }}
                className={`text-white text-lg px-10 py-3 rounded-full transition-all transform ${isLoading && "cursor-not-allowed"} hover:scale-105`}
                disabled={isLoading}
            >
                {isLoading ? <span className="spinner"></span> : "PLACE ORDER"}
            </button>
        </div>
    </div>
</div>

</form>

  );
};

export default PlaceOrder;
