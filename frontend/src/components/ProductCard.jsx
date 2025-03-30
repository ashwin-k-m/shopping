import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useProductStore } from "../store/product";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsModalOpen(false);
    if (!success) {
      toast.error(message);
    } else {
      toast.success("Product updated successfully");
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Toaster position="top-right" />
      
      <img 
        src={product.image} 
        alt={product.name} 
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="font-bold text-xl text-gray-600 dark:text-gray-200 mb-4">
          ${product.price}
        </p>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Update Product</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                &times;
              </button>
            </div>

            <div className="p-4 space-y-4">
              <input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;