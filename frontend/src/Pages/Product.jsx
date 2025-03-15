import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

import RelatedProducts from "../Components/RelatedProducts";

const Product = ({ token }) => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || "");
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    addToCart(productData._id);
    toast.success("Product added to cart successfully!");
  };

  return (
    <>
      {productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 pr-4 lg:pr-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              <img
                className="w-full h-auto max-h-[300px] md:max-h-[700px] object-contain cursor-pointer"
                src={image}
                alt={productData.name || "Product Image"}
              />
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {productData.image?.map((item, index) => (
                  <img
                    key={index}
                    onClick={() => setImage(item)}
                    src={item}
                    className={`w-20 h-auto cursor-pointer border transition-all duration-200 ${
                      image === item ? "border-black scale-100" : "border-gray-300"
                    }`}
                    alt={`Thumbnail ${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="font-medium text-xl md:text-2xl">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="Star Icon"
                    className="w-4"
                  />
                ))}
                <p className="pl-2">(122)</p>
              </div>
              <p className="mt-5 text-xl md:text-3xl font-medium">
                <span className="line-through text-lg md:text-2xl text-gray-500">
                  {currency}
                  {productData.oldPrice} /-
                </span>
                <span className="ml-3">
                  {currency}
                  {productData.newPrice} /-
                </span>
              </p>
              <p className="mt-6 text-sm md:text-base">
                <strong>DESCRIPTION:</strong>
              </p>
              <p>
                <i>{productData.description}</i> 
              </p>
              {/* <p>
                <strong>Neck Type:</strong> {productData.neckType}
              </p>
              <p>
                <strong>Fabric Type:</strong> {productData.fabricType || "N/A"}
              </p>
              <p>
                <strong>GSM:</strong> {productData.gsm}
              </p> */}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-[#C70909] px-6 py-2 md:px-8 md:py-3 text-xs md:text-sm text-white rounded-md hover:bg-[#7ab9a1] transition-all duration-200"
              >
                ADD TO CART
              </button>

              {/* Additional Info */}
              <div className="text-xs md:text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% original product.</p>
                <p>Cash on delivery is available on this product.</p>
                {/* <p>Easy return and exchange policy within 7 days.</p> */}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <hr className="mt-5" />
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      ) : (
        <div className="opacity-0"></div>
      )}

      {/* Modal for Enlarged Image */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-3xl w-full p-4 bg-white rounded-md">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-600"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
