// app/product/[id]/page.js (No types)
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";

export default async function ProductDetailsPage({ params }) {
  // Await params (Next.js 15)
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/product"
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            &larr; Back to Marketplace
          </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Product Image */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center min-h-[400px]">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover max-h-[600px]"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {product.location}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Posted on {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-4xl font-extrabold text-gray-900">
              <span>₹</span>  {product.price.toLocaleString()}
            </div>

            <div className="prose prose-sm text-gray-600">
              <h3 className="text-gray-900 font-semibold mb-2">Details</h3>
              <p className="whitespace-pre-line leading-relaxed">
                {product.details}
              </p>
            </div>

            {/* Seller Info Card */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Seller Contact
              </h3>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {product.sellerUsername.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    @{product.sellerUsername}
                  </p>
                  <p className="text-sm text-gray-500">
                    +91 {product.contactDetail}
                  </p>
                </div>
                <a
                  href={`tel:${product.contactDetail}`}
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
