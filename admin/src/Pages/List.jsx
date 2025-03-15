import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditProductModal from "./EditProductModal";
import DetailsModal from "./DetailsModal";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/hitech/product/track`, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        console.log(response.data);
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the products");
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/hitech/product/remove`,
        { id },
        { headers: { Authorization: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while removing the product");
    }
  };

  const editProduct = async (id) => {
    const response = await axios.post(
      `${backendUrl}/api/hitech/product/get`,
      { id }
    ).catch(error => {
      console.error(error);
    });
    setProductToEdit(response.data.product);
    setIsEditModalOpen(true);
  };

  const showDetails = (product) => {
    setProductDetails(product);
    setIsDetailsModalOpen(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-semibold">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-8 items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
          <div className="col-span-1">Image</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Total Quantity</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          list.slice().reverse().map((item, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 items-center gap-2 py-2 px-4 border bg-white hover:bg-gray-50 text-sm"
              key={index}
            >
              <img className="w-12 col-span-1" src={item.image[0]} alt={item.name} />
              <p className="col-span-2">{item.name}</p>
              <p className="col-span-1">{item.category}</p>
              <p className="col-span-1">{currency} {item.newPrice}</p>
              <p className="col-span-1">{item.totalQuantity}</p>
              <div className="col-span-1 flex justify-center gap-2">
                <FaEdit
                  onClick={() => editProduct(item._id)}
                  size={25}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  title={`Edit ${item.name}`}
                  aria-label={`Edit ${item.name}`}
                />
                <MdDeleteForever
                  onClick={() => removeProduct(item._id)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  size={30}
                  title={`Delete ${item.name}`}
                  aria-label={`Delete ${item.name}`}
                />
                <FaInfoCircle
                  onClick={() => showDetails(item)}
                  className="cursor-pointer text-green-500 hover:text-green-700"
                  size={25}
                  title={`Details for ${item.name}`}
                  aria-label={`Details for ${item.name}`}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {isEditModalOpen && (
        <EditProductModal
          product={productToEdit}
          setIsEditModalOpen={setIsEditModalOpen}
          fetchList={fetchList}
          token={token}
        />
      )}

      {isDetailsModalOpen && (
        <DetailsModal
          product={productDetails}
          setIsDetailsModalOpen={setIsDetailsModalOpen}
        />
      )}
    </>
  );
};

export default List;
