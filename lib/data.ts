// lib/data.ts
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import User from "@/models/User";

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const product = await Product.findById(id).lean();

    if (!product) return null;
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

export async function getUserDetails(username: string) {
  try {
    const session = await getServerSession(authOptions);
    const id=session?.user.id;

    if (!session || !session.user.username) {
      return null;
    }
    
    await connectToDatabase();
    const user = await User.findById(id);
    user.password = undefined;
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
}