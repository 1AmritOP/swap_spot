import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // get id from params
  // validate id
  // connect to db
  // find product by id
  // return product

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("Error during fetching Product detail : ", error);
    return NextResponse.json(
      { error: "Error during fetching Product detail" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // check user is logged in or not
    // get id from params
    // validate id
    // take data from request.json()
    // validate data
    // connect to db
    // find product by id
    // check user is owner or not
    // update product
    // return updated product

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    const body: IProduct = await request.json();

    if (
      !body.details ||
      !body.contactDetail ||
      !body.name ||
      !body.price ||
      !body.img ||
      !body.sellerUsername ||
      !body.location
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { sellerUsername, ...updateData } = body;

    await connectToDatabase();

    const product = await Product.findOneAndUpdate(
      {
        _id: id,
        sellerUsername: session.user.username,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found or you are not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error during updating Product detail : ", error);
    return NextResponse.json(
      { error: "Error during updating Product detail" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    // Single query: check ownership + delete
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      sellerUsername: session.user.username,
    });

    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found or you are not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Product deletion failed", details: error },
      { status: 500 }
    );
  }
}
