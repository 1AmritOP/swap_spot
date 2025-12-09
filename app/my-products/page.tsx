"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "../components/Loader";
import { IProduct } from "../product/page";

const UserProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/api/product/user");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }
        setProducts(data.userProducts || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const confirmDeleteAction = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/product/${productToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }
      
      toast.success("Product deleted successfully");
      
      // Update UI
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete)
      );
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    } finally {
      setProductToDelete(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: 3,
    }).format(price);
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Listings</h1>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">
            You haven&apos;t listed any products yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <img
                  src={product.img || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                  {product.location}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-10">
                  {product.details}
                </p>

                <div className="border-t pt-3 mt-2 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Contact: {product.contactDetail}</span>
                    <span>{formatDate(product.createdAt)}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      className="flex-1 cursor-pointer bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductToDelete(product._id)}
                      className="flex-1 cursor-pointer bg-red-50 text-red-600 text-sm py-2 rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 cursor-pointer text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProductsPage;