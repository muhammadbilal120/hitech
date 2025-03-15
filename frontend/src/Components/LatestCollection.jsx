import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const sortedProducts = products
      .slice() // Create a copy of the products array to avoid mutating the original
      .sort((a, b) => b._id.localeCompare(a._id)); // Sort by product ID in descending order

    setLatestProducts(sortedProducts.slice(0, 10)); // Get the latest 10 products
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur ipsa praesentium nostrum fuga
          maxime tempore repudiandae sapiente!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.newPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
