"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/app/components/UploadImg";

export default function CreateProductPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
    contactDetail: "",
    img: "", // Ab yeh URL ImageUpload component se aayega
    location: "",
    sellerUsername: "",
  });

  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  
  // New State: Track agar image upload ho rahi hai to form submit rokhne ke liye
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- New Handlers for Image Upload ---
  const handleImageUploadStart = () => {
    setIsImageUploading(true);
  };

  const handleImageUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, img: url }));
    setIsImageUploading(false);
  };
  // -------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Image zaroori hai
    if (!formData.img) {
        setStatus({ ...status, error: "Please upload an image first." });
        return;
    }

    setStatus({ loading: true, error: "", success: "" });

    // Agar session se username nahi mila toh fallback form data use karein
    const finalSellerUsername = session?.user?.username || formData.sellerUsername;

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sellerUsername: finalSellerUsername, // Session username ensure karein
          price: Number(formData.price),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, error: "", success: "Product created successfully!" });
        setTimeout(() => router.push("/"), 2000); 
      } else {
        setStatus({ loading: false, error: data.error || "Something went wrong", success: "" });
      }
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, error: "Failed to connect to server", success: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sell a Product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Fill in the details below to list your item.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Status Messages */}
          {status.error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
              <p>{status.error}</p>
            </div>
          )}
          {status.success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4 text-green-700">
              <p>{status.success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. iPhone 13 Pro"
                />
              </div>
            </div>

            {/* Price & Location Row */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <div className="mt-1">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. Delhi"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Username Row */}
            <div className="flex gap-4">
               <div className="w-1/2">
                <label htmlFor="contactDetail" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className="mt-1">
                  <input
                    id="contactDetail"
                    name="contactDetail"
                    type="text"
                    required
                    value={formData.contactDetail}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="w-1/2">
                <label htmlFor="sellerUsername" className="block text-sm font-medium text-gray-700">
                  Seller Username
                </label>
                <div className="mt-1">
                  <input
                    id="sellerUsername"
                    name="sellerUsername"
                    type="text"
                    required
                    disabled
                    value={session?.user?.username || "Guest"}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm text-gray-500 sm:text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* --- REPLACED: Image Upload Component --- */}
            <div>
               <ImageUpload
                 onUploadStart={handleImageUploadStart}
                 onUploadSuccess={handleImageUploadSuccess}
               />
               {/* Hidden input to ensure validation works if needed, though state check is better */}
               <input type="hidden" name="img" value={formData.img} required />
            </div>
            {/* ---------------------------------------- */}

            {/* Description */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  value={formData.details}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe the condition, features, etc."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status.loading || isImageUploading} // Disable if uploading or submitting
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${(status.loading || isImageUploading) ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {status.loading 
                    ? "Creating..." 
                    : isImageUploading 
                        ? "Uploading Image..." 
                        : "Create Product"
                }
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}