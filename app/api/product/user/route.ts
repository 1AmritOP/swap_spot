import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // check user is logged in or not
    // take username from session.user.username
    // connect to db
    // find product by username
    // return product
    const session = await getServerSession(authOptions);

    if (!session || !session.user.username) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const userProducts = await Product.find({
      sellerUsername: session.user.username,
    }).lean();

    if (!userProducts || userProducts.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      {
        message: "User Products fetched successfully",
        userProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get User Products ", error);
    return NextResponse.json(
      { error: "Failed to get User Products" },
      { status: 500 }
    );
  }
}
