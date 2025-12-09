import Link from "next/link";
import React from "react";
import { IProduct } from "../product/page"; // Ensure your Product interface has 'createdAt'

// Helper function to format the date
const getRelativeTime = (dateString?: string | Date) => {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  const now = new Date();

  // Create date objects set to midnight to compare strictly by day
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const postDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7 && diffDays > 1) {
    return `${diffDays} days ago`;
  } else {
    // Returns format like "Oct 24" or "Dec 08"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};
const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div>
      {/* --- FRESH RECOMMENDATIONS --- */}
      {/* Note: Updated href to match your folder structure if needed */}
      <Link
        href={`/product/product-detail/${product._id}`} 
        className="block mb-4"
      >
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
          <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
            <img
              src={
                product.img ||
                "https://static.contrado.com/resources/images/2016-7/43757/generating-thumbnails-63420.gif"
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">₹ {product.price.toLocaleString()} </h3>
            <p className="text-gray-600 text-sm mb-2 truncate">
              {product.name}
            </p>
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <span className="truncate max-w-[100px]">{product.location}</span>
              
              {/* --- DYNAMIC DATE HERE --- */}
              <span>{getRelativeTime(product.createdAt)}</span>
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;