import React from "react";
import Modal from "react-modal";

const DetailsModal = ({ product, setIsDetailsModalOpen }) => {
  if (!product) return null; // Return null if no product is provided

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Product Details"
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-auto shadow-lg max-h-full overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-black text-center">Product Details</h2>

        {/* Responsive Image at the top */}
        <div className="w-full flex justify-center mb-4">
          <img src={product.image[0]} alt={product.name} className="w-[10%] h-auto max-h-[15%] rounded-md object-contain" />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full mb-4 text-black">
            <tbody>
              <tr>
                <td className="border px-4 py-2"><strong>Name</strong></td>
                <td className="border px-4 py-2">{product.name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>Description</strong></td>
                <td className="border px-4 py-2">{product.description}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>Category</strong></td>
                <td className="border px-4 py-2">{product.category}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>SubCategory</strong></td>
                <td className="border px-4 py-2">{product.subCategory}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>Price</strong></td>
                <td className="border px-4 py-2">{product.newPrice}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>Quantity</strong></td>
                <td className="border px-4 py-2">{product.quantity}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"><strong>Best Seller</strong></td>
                <td className="border px-4 py-2">{product.bestSeller ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button 
          onClick={closeModal} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default DetailsModal;
