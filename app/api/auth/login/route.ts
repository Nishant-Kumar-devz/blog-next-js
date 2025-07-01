// app/api/auth/login/route.ts

import User, { IUser } from "@/models/user"; // Import IUser interface
import { Types } from "mongoose"; // Import Types for ObjectId
import { NextResponse } from "next/server";
import connectMongodb from "@/lib/mongodb";
import { generateToken } from "@/lib/generateToken"; // Assuming this is for your custom JWT logic
import { ok } from "assert";

// Function to handle user login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongodb();
    // Check if user exists
    // CRITICAL FIX: Add .select('+password') to retrieve the hashed password
    const existingUser = (await User.findOne({ email }).select(
      "+password"
    )) as (IUser & { _id: Types.ObjectId });

    if (!existingUser) {
      return NextResponse.json(
        { error: "No user found with this email." },
        { status: 404 }
      );
    }

    // Now, existingUser.password should contain the hashed password
    // console.log("Stored hashed password:", existingUser.password); // For debugging, remove in production

    // Check password using the isPasswordCorrect method defined on your Mongoose model
    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Generate token (assuming you have a function to generate JWT tokens)
    // Make sure userForToken has the correct structure for your generateToken function
    const userForToken = {
      _id: existingUser._id.toString(), // Convert ObjectId to string for token
      email: existingUser.email,
      name: existingUser.name || "", // Ensure name is a string, even if optional
      userType: "user", // Add userType to match userInterface
    };

    const token: string | null = await generateToken(userForToken);

    if (!token) {
      return NextResponse.json(
        { error: "Failed to generate authentication token" },
        { status: 500 }
      );
    }

    // Create a response and set the token (e.g., in a header or cookie)
    // IMPORTANT: Never send the password hash back to the frontend
    const { password: _, ...userData } = existingUser.toObject(); // .toObject() safely converts Mongoose doc to plain JS object

    const response = NextResponse.json(
      { message: "Login successful", user: userData, token, ok: true },
      { status: 200 }
    );

    // If you're setting the token as a cookie (recommended for HttpOnly):
    // response.cookies.set('auth-token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   path: '/',
    // });
    response.headers.set("Authorization", `Bearer ${token}`); // Setting token in header for simplicity, adjust as needed

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
