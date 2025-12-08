import React from 'react'
import { getProductDetail } from "@/lib/library"
import Link from 'next/link';

const page = async ({ params }) => {
  // Await params as required in Next.js 15+
  const { id } = await params;
  const details = await getProductDetail(id);

  // Handle case where product is not found
  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">Product not found</h1>
      </div>
    );
  }

  // Format the date to be readable
  const formattedDate = new Date(details.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="md:flex">
          {/* Left Side: Product Image */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-200">
            {/* Using standard img tag. If your img string is a full URL, this works. 
                If using Next/Image, you need to configure domains. */}
            <img 
              src={details.img || "https://via.placeholder.com/400"} 
              alt={details.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Product Details */}
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                    {details.name}
                    </h1>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                    📍 {details.location}
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500 block">Price</span>
                    <span className="text-2xl font-bold text-green-600">
                    ₹{details.price}
                    </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  Description
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {details.details}
                </p>
              </div>

              {/* Seller Metadata */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <p>
                    Seller: <span className="font-medium text-gray-900">{details.sellerUsername}</span>
                  </p>
                  <p>Posted: {formattedDate}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <a 
                href={`tel:${details.contactDetail}`}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Call Seller: {details.contactDetail}
              </a>
              <p className="mt-2 text-xs text-center text-gray-400">
                Product ID: {details._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page