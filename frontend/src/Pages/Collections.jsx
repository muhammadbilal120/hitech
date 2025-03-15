import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import OverPolicy from "../Components/OverPolicy";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true); // Hidden on mobile by default
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // TOGGLE FUNCTION
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(
          filterProductCopy.sort((a, b) => a.newPrice - b.newPrice) // Sort by newPrice
        );
        break;
      case "high-low":
        setFilterProducts(
          filterProductCopy.sort((a, b) => b.newPrice - a.newPrice) // Sort by newPrice
        );
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
  <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
    <p
      onClick={() => setShowFilter(!showFilter)}
      className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
    >
      Filters
      <img
        className={`h-3 transition-transform duration-300 ${
          showFilter ? "rotate-90" : ""
        }`}
        src={assets.dropdown_icon}
        alt="dropdown icon"
      />
    </p>

    <div
      className={`min-w-60 ${showFilter ? "block" : "hidden"} sm:block sticky`}
    >
      <div className="border border-red-300 pl-5 py-3 mt-6 m-4">
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"Honda"}
              onChange={toggleCategory}
            />{" "}
            Honda
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"Yamaha"}
              onChange={toggleCategory}
            />{" "}
            Yamaha
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"Suzuki"}
              onChange={toggleCategory}
            />{" "}
            Suzuki
          </p>
        </div>
      </div>
      <div className="border border-red-300 pl-5 py-3 mt-6 m-4">
        <p className="mb-3 text-sm font-medium">Sub-Catagories</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"70"}
              onChange={toggleSubCategory}
            />{" "}
            70 CC
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"125"}
              onChange={toggleSubCategory}
            />{" "}
            125 CC
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={"150"}
              onChange={toggleSubCategory}
            />{" "}
            150 CC
          </p>
        </div>
      </div>
    </div>

    <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={"ALL"} text2={"COLLECTION"} />

        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2"
        >
          <option value="relavent">sort by: Relevant</option>
          <option value="low-high">sort by: Low to High</option>
          <option value="high-low">sort by: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filterProducts.map((item, index) => (
          <div className="flex flex-col items-center">
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.newPrice}
              oldPrice={item.oldPrice} // Passing oldPrice for strikethrough
              image={item.image}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  <OverPolicy />
</>

  );
};

export default Collections;
