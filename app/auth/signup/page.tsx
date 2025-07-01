// app/auth/signup/page.tsx
"use client"; // This is a Client Component as it uses useState and handles user interaction

import { useState } from "react";
import { useRouter } from "next/navigation"; // For client-side navigation
import Link from "next/link"; // For navigating to the login page

export default function SignUpPage() {
  const [name, setName] = useState(""); // Optional: for user's name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize router for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setLoading(true); // Show loading indicator

    // --- Client-side Validation ---
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    // You can add more complex regex for email validation here if needed

    try {
      // Make a POST request to your custom registration API route
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // If the response is not OK (e.g., 400, 409, 500 status codes)
        setError(data.message || "Registration failed. Please try again.");
        return; // Stop execution
      }

      // --- Registration Successful ---
      console.log("User registered successfully:", data.user);
      // Redirect to the login page after successful registration
      router.push("/auth/signin?registered=true"); // Add query param for optional message
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <main className="pt-24 min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
      {/* Background circles for visual interest (same as signin) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Form Container - Glassmorphism style (same as signin) */}
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-lg  bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-blue-900 border-opacity-20 dark:border-gray-700 dark:border-opacity-30 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-black dark:text-white drop-shadow-lg">
          Join Us!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-black dark:text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-black bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-700 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
              placeholder="Your Name"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-black dark:text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-black bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-700 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
              placeholder="your@example.com"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-black dark:text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-black bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-700 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-black dark:text-gray-200 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-black bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-700 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-200 text-sm mt-2 text-center drop-shadow-md">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 dark:focus:ring-teal-400 transition transform hover:-translate-y-0.5 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300 drop-shadow-md">
          Already have an account? &nbsp;
          <Link
            href="/auth/signin"
            className="font-bold text-blue-400 hover:text-blue-900 dark:text-purple-300 dark:hover:text-purple-200 transition-colors duration-200 underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
