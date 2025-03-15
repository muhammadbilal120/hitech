import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topware");
  const [bestseller, setBestseller] = useState(false);
  const [neckType, setNeckType] = useState("Round Neck");
  const [quantity, setQuantity] = useState(0);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formDataAdd = new FormData();
    formDataAdd.append("name", name);
    formDataAdd.append("description", description);
    formDataAdd.append("oldPrice", oldPrice);
    formDataAdd.append("newPrice", newPrice);
    formDataAdd.append("category", category);
    formDataAdd.append("subCategory", subCategory);
    formDataAdd.append("bestseller", bestseller);
    formDataAdd.append("neckType", neckType);
    formDataAdd.append("quantity", quantity);

    if (image1) formDataAdd.append("image1", image1);
    if (image2) formDataAdd.append("image2", image2);
    if (image3) formDataAdd.append("image3", image3);
    if (image4) formDataAdd.append("image4", image4);

    try {
      const response = await axios.post(backendUrl + "/api/hitech/product/add", formDataAdd, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setOldPrice("");
        setNewPrice("");
        setCategory("Men");
        setSubCategory("Topware");
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setNeckType("Round Neck");
        setQuantity(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Honda">Honda</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Suzuki">Suzuki</option>
          </select>
        </div>
        <div>
          <p className="mb-2">SubCategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="70">70 CC</option>
            <option value="125">125 CC</option>
            <option value="150">150 CC</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Price</p>
          <input
            style={{ marginRight: "10px", marginBottom: "10px" }}
            type="number"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="max-w-[500px] px-3 py-2"
          />
          <input
            style={{ marginRight: "10px", marginBottom: "10px" }}
            type="number"
            placeholder="New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="max-w-[500px] px-3 py-2"
          />
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Quantity</p>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Enter quantity"
          required
        />
      </div>

      <div className="w-full flex">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <p className="ms-3">Best Seller</p>
      </div>

      <button
        type="submit"
        style={{ background: "#8ACFB6" }}
        className="w-28 py-3 mt-4 text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
