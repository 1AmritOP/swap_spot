import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    if (!products || products.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to fetch products:", error);
    return NextResponse.json(
      {
        error: "failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // await connectToDatabase();
    // take data from request
    // validate data
    // create product
    // send response

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: IProduct = await request.json();

    if (
      !body.details ||
      !body.contactDetail ||
      !body.name ||
      !body.price ||
      !body.img ||
      !body.sellerUsername||
      !body.location
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    if (!product) {
      return NextResponse.json(
        { error: "Product creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.log("Product creation error : ", error);
    return NextResponse.json(
      { error: "Product creation failed" },
      { status: 500 }
    );
  }
}

