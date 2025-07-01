import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// 1. Declare global type for TypeScript to correctly define the cached object's structure
declare global {
  var con: {
    connection?: typeof import("mongoose"); // Correctly refers to the Mongoose module instance
    promise?: Promise<typeof import("mongoose")>; // Correctly refers to a promise resolving to the Mongoose module instance
  };
}

// 2. Use `global.con` for caching.
// Assign it first
let cached = global.con;

// This is the CRITICAL block you were missing (or removed):
// If `cached` (which points to `global.con`) is not yet an object, initialize it.
if (!cached) {
  cached = global.con = { connection: undefined, promise: undefined };
}

async function connectMongodb() {
  // If a connection already exists and is cached, return it immediately.
  // Using `cached.connection` directly without optional chaining here is safe
  // because `cached` is guaranteed to be an object due to the initialization above.
  if (cached.connection) {
    console.log("MONGODB already connected (reusing cached connection).");
    return cached.connection;
  }

  // If there's no active connection promise, create a new one.
  // Using `cached.promise` directly without optional chaining here is safe.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents Mongoose from buffering operations if connection isn't ready
    };
    // Use the non-null assertion operator (!) here to tell TypeScript MONGO_URI is definitely a string
    cached.promise = mongoose.connect(MONGO_URI!, opts);
  }

  try {
    // Await the promise to get the actual mongoose instance (the connection).
    cached.connection = await cached.promise;
    console.log("MONGODB CONNECTED successfully!");
  } catch (e) {
    // If connection fails, clear the promise so that a new attempt can be made next time.
    cached.promise = undefined;
    console.error("MONGODB connection FAILED:", e);
    throw e; // Re-throw the error to indicate connection failure to the caller.
  }

  return cached.connection;
}

export default connectMongodb;
