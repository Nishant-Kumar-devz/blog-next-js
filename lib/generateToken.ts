// generate token for user authentication
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
const JWT_SECRET_STR: string = JWT_SECRET;

export interface userInterface {
  _id: string;
  email: string;
  name?: string;
  userType: string;
}
export async function generateToken(user: userInterface) {
  try {
    // Ensure the user object has the necessary properties
    if (!user || !user._id || !user.email) {
      throw new Error("Invalid user object");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name || "",
        userType: user.userType || "",
      }, // Include name if available
      JWT_SECRET_STR
    );

    // Return the token
    return token as string;
  } catch (error) {
    console.error("Token generation error:", error);
    return null as string | null;
  }
}
