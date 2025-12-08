// lib/data.ts
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export interface SerializedProduct {
  _id: string;
  name: string;
  price: number;
  img: string;
  details: string;
  contactDetail: number;
  sellerUsername: string;
  location: string;
  createdAt: string;
}

export async function getProductById(id: string): Promise<SerializedProduct | null> {
  try {
    await connectToDatabase();

    // 1. Validate the ID format to prevent app crashes
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    // 2. Fetch data directly (bypassing the API network call for speed)
    const product = await Product.findById(id).lean();

    if (!product) return null;

    // 3. Serialize: Convert Mongoose ObjectIds and Dates to strings
    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      img: product.img,
      details: product.details,
      contactDetail: product.contactDetail,
      sellerUsername: product.sellerUsername,
      location: product.location,
      createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
}