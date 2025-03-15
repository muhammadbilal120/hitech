import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const EditProductModal = ({ product, setIsEditModalOpen, fetchList, token }) => {
  const [formData, setFormData] = useState({
    id: product._id,
    name: product.name,
    description: product.description,
    oldPrice: product.oldPrice,
    newPrice: product.newPrice,
    category: product.category,
    subCategory: product.subCategory,
    bestseller: product.bestseller ? "true" : "false",
    neckType: product.neckType || "Round Neck",
    images: [],
  });

  const [existingImages, setExistingImages] = useState(product.images || []);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  }, []);

  const handleRemoveExistingImage = useCallback((index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images') {
          formDataToSend.append(key, value);
        }
      });

      formDataToSend.append("existingImages", JSON.stringify(existingImages));
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index + 1}`, image);
      });

      const response = await axios.post(
        `${backendUrl}/api/hitech/product/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditModalOpen(false);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsEditModalOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-black">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 text-black">Old Price</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                placeholder="Old Price"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-black">New Price</label>
              <input
                type="number"
                name="newPrice"
                value={formData.newPrice}
                onChange={handleInputChange}
                placeholder="New Price"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 text-black">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-black">Neck Type</label>
            <select
              name="neckType"
              value={formData.neckType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            >
              <option value="Round Neck">Round Neck</option>
              <option value="Collar Neck">Collar Neck</option>
              <option value="V Neck">V Neck</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-black">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 h-[10vh]"
            />
          </div>

          {existingImages.length > 0 && (
            <div>
              <h3 className="font-semibold text-black">Existing Images:</h3>
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Existing ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block mb-2 text-black">Upload New Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div>
              <h3 className="font-semibold text-black">New Image Previews:</h3>
              <div className="flex gap-2 flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#8acfb6" }}
              className="px-4 py-2 text-white rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditProductModal;
