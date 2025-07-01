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
      // Optionally clear error if any previous one was set
      setError(null);
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
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              disabled={loading}
            />
          </div>
          {/* Display messages */}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={loading}>
            {loading ? "Logging In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? &nbsp;
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
