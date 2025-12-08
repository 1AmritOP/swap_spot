import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, username, password } = await request.json();
    

    if ([name, username, password].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const userExist = await User.findOne({ username });
    if (userExist) {
      return NextResponse.json(
        { error: "Username already Register" },
        { status: 400 }
      );
    }

    await User.create({ name, username: username.toLowerCase(), password });

    return NextResponse.json(
      { message: "User registered successfully", user: { name, username } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
