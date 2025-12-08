
import Link from "next/link";
import React from "react";
import { Product } from "../product/page";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      {/* --- FRESH RECOMMENDATIONS --- */}
      <Link
        href={`/product/product-detail/${product._id}`}
        className="block mb-4"
      >
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
          <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
            <img
              src={product.img || "https://static.contrado.com/resources/images/2016-7/43757/generating-thumbnails-63420.gif"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">₹ {product.price} </h3>
            <p className="text-gray-600 text-sm mb-2 truncate">
              {product.name}
            </p>
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <span>{product.location}</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
