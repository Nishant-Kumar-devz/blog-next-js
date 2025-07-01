import { model, Schema, Document, models } from "mongoose";
import bcrypt from "bcrypt"; 
// Define the interface for your user document, extending Mongoose's Document
// This provides type safety for Mongoose-specific properties like _id, createdAt, etc.
// and also for your custom methods.
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date; // Added implicitly by timestamps: true
  updatedAt: Date; // Added implicitly by timestamps: true
  // Add your custom methods here for type safety
  isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>( // Specify the interface here
  {
    name: {
      type: String,
      required: false, // Make name optional if not strictly needed
      trim: true,
      // You might add minlength, maxlength here
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Add required validation message
      unique: true, // Email must be unique
      lowercase: true, // Store email in lowercase
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email regex validation
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Add required validation message
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length
      select: false, // IMPORTANT: Do not return password by default in queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash password before saving
// IMPORTANT: Use a traditional `function` for `this` context
userSchema.pre<IUser>("save", async function (next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified("password")) {
    return next(); // If password is not modified, skip hashing
  }

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
  next(); // Proceed with saving
});

// Method to compare candidate password with the stored hashed password
// IMPORTANT: Use a traditional `function` for `this` context
userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  // `this` refers to the Mongoose document instance here
  return await bcrypt.compare(password, this.password);
};

// Export the Mongoose model
import type { Model } from "mongoose";
export default (models.User as Model<IUser>) || model<IUser>("User", userSchema);
