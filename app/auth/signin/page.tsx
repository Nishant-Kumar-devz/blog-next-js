// app/auth/signin/page.tsx
"use client"; // This is a Client Component

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // For error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success messages
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Display a success message if redirected from registration
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registration successful! Please sign in.");
      setError(null); // Clear any previous error
    }
    // You might want to clear this message after a few seconds
    const timer = setTimeout(() => {
      setSuccessMessage(null);
      // Also remove the query param from URL if desired to prevent message re-showing on refresh
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("registered");
      window.history.replaceState({}, "", newUrl.toString());
    }, 5000); // Message disappears after 5 seconds
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success messages
    setLoading(true); // Show loading indicator

    // --- Client-side Validation ---
    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Get the response body (JSON data) regardless of response.ok status
      const data = await response.json();

      if (response.ok) {
        // HTTP status is 2xx (e.g., 200 OK)
        const tokenFromHeader = response.headers
          .get("Authorization")
          ?.split(" ")[1];
        const tokenFromBody = data.token; // Your API sends token in body too

        const authToken = tokenFromHeader || tokenFromBody; // Prefer header, fallback to body

        if (authToken) {
          localStorage.setItem("authToken", authToken); // Store the token
          setSuccessMessage("Login successful!");
          router.push("/dashboard"); // Redirect to a protected page
        } else {
          setError("Login successful, but no authentication token received.");
        }
      } else {
        // HTTP status is not 2xx (e.g., 400, 401, 404, 500)
        setError(
          data.error ||
            "Login failed. Please check your credentials or try again."
        );
      }
    } catch (err) {
      console.error("Login failed due to network or unexpected error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
      {/* Background circles for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-lg  bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-blue-900 border-opacity-20 dark:border-gray-700 dark:border-opacity-30 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-black dark:text-white drop-shadow-lg">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-1 block w-full px-4 py-2 bg-gray-900 bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-900 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
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
              className="mt-1 block w-full px-4 py-2 bg-gray-900 bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 border border-blue-900 border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-white placeholder-opacity-70 text-white dark:text-white transition-colors duration-200"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {/* Display messages */}
          {successMessage && (
            <p className="text-green-400 text-sm mt-2 text-center drop-shadow-md">
              {successMessage}
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center drop-shadow-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-purple-400 transition transform hover:-translate-y-0.5 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-700 dark:text-gray-300 drop-shadow-md">
          Don't have an account? &nbsp;
          <Link
            href="/auth/signup"
            className="font-bold text-blue-400 hover:text-blue-900 dark:text-purple-300 dark:hover:text-purple-200 transition-colors duration-200 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
