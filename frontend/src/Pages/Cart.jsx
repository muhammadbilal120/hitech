import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      Object.keys(cartItems).forEach((itemId) => {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      });
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleCheckout = () => {
    if (cartData.length === 0) {
      alert("Please add items to your cart first!");
    } else {
      navigate("/place-order");
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-3xl mb-6 font-semibold text-gray-900">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            Your cart is empty. Please add items to your cart first!
          </p>
        </div>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div
                key={index}
                className="py-6 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-3 items-center gap-6 mb-6 hover:bg-gray-50 transition-all rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={productData?.image[0]}
                    alt={productData?.name || "Product image"}
                    className="w-24 sm:w-32 rounded-lg shadow-md object-cover ms-4"
                  />
                  <div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">{productData?.name}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <p className="text-base sm:text-lg text-gray-800 font-medium">
                        {currency}{productData?.newPrice}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <p className="text-gray-700">Quantity:</p>
                  <input
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 0) updateQuantity(item._id, value);
                    }}
                    className="border rounded-lg max-w-[80px] sm:max-w-[100px] text-center py-2 px-3"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-gray-700">Remove:</p>
                  <img
                    onClick={() => updateQuantity(item._id, 0)}
                    className="w-6 sm:w-8 cursor-pointer transition-transform transform hover:scale-110 ml-3"
                    src={assets.bin_icon}
                    alt="Remove item"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px] rounded-lg bg-white">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={handleCheckout}
                className="text-sm my-8 px-8 py-3 bg-[#8ACFB6] text-white font-semibold rounded-lg hover:bg-[#7cb59e] transition-all"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
