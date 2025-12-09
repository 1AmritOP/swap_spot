"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ArrowRight } from "lucide-react";
import Loader from "../components/Loader";


export interface IProduct {
  price: number;
  img: string;
  name: string;
  details: string;
  contactDetail: number | string;
  sellerUsername: string;
  location: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const page = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch("/api/product");
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    };
    getProduct();
  }, []);

  return products.length === 0 ? (
    <Loader />
  ) : (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">Fresh Products</h2>
            <a
              href="#"
              className="text-emerald-600 font-semibold flex items-center hover:underline"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
