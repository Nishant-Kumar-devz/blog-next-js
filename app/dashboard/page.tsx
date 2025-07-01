// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Card from "@/components/Card";

// Define a simple interface for the decoded token payload
interface DecodedToken {
  email: string;
  name: string;
  userType: string;
  iat: number;
}

// Define an interface for your blog post data (matching Card props)
interface BlogPost {
  title: string;
  description: string;
  imageUrl?: string;
  slug: string;
  author: string;
  date: string;
}

const DashboardPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {

    const checkAuthAndLoadData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/auth/signin");
        return; // Important: exit early if no token
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserEmail(decoded.email);
        setUserName(decoded.name || "User");

        // Simulate fetching recent posts
        const simulatedPosts: BlogPost[] = [
          {
            title: "Understanding Next.js App Router",
            description:
              "Dive deep into the new App Router in Next.js 13+, exploring its features, benefits, and how to migrate your existing projects.",
            imageUrl:
              "https://imgs.search.brave.com/8kHdahKdfo9MmJhfxw_4CddTiqA17niqxffMwmNT1ns/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXRp/bGx1c3RyYXRpb25z/LmItY2RuLm5ldC8v/cGhvdG9zL3BhY2sv/RmludGVjaC1idXNp/bmVzcy12ZWN0b3It/aWxsdXN0cmF0aW9u/c19sZy5wbmc",
            slug: "understanding-nextjs-app-router",
            author: "Jane Doe",
            date: "June 20, 2024",
          },
          {
            title: "The Power of Tailwind CSS",
            description:
              "Learn how Tailwind CSS can revolutionize your web development workflow with its utility-first approach and highly customizable nature.",
            imageUrl:
              "https://imgs.search.brave.com/OpO4dqdeydWrd8bqjcQMQ7h-9nN00GVG8BULgpzK32E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9zdHJhcGkvaWxs/dXN0cmF0aW9uc19w/ZW9wbGVfY2Q2YjEz/ZTZmZS5wbmc_Zj13/ZWJwJnc9MzEy",
            slug: "the-power-of-tailwind-css",
            author: "John Smith",
            date: "June 15, 2024",
          },
          {
            title: "State Management in React: A Comprehensive Guide",
            description:
              "Explore different state management solutions in React, from useState and useContext to Redux and Zustand, and choose the best for your project.",
            imageUrl:
              "https://imgs.search.brave.com/1u-DHYbYe9fg_pU9QqsqlgCE6ykZYULxfpc7hOfpPNI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/ODJkMWM2YjNjMTZi/Yjk1NmVhZmQ2YWEv/NjgyZDFjNmIzYzE2/YmI5NTZlYWZkY2Ez/X1RodW1ibmFpbC0w/MDEzNC5wbmc",
            slug: "state-management-in-react",
            author: "Alice Johnson",
            date: "June 10, 2024",
          },
          {
            title: "GraphQL vs REST: Which API Approach Is Right for You?",
            description:
              "A detailed comparison of GraphQL and RESTful APIs, discussing their advantages, disadvantages, and ideal use cases for modern web applications.",
            imageUrl:
              "https://imgs.search.brave.com/MfK1q5pAGL2PocLS63z67IhBOB23X9QFS60a1ZlWzB4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzc5LzAxLzE0/LzM2MF9GXzI3OTAx/MTQ0NF9kZXNvWlVk/M3hyVXhrb1d6NHc4/dUxQQ1d5WDBRRWVy/aS5qcGc",
            slug: "graphql-vs-rest",
            author: "Bob Williams",
            date: "June 5, 2024",
          },
          {
            title: "Optimizing Web Performance: A Checklist",
            description:
              "Boost your website's speed and user experience with this comprehensive checklist for performance optimization, covering images, code, and more.",
            imageUrl:
              "https://imgs.search.brave.com/Wsab5h5AWa3eN2TEQZLtNKRaPjBBM0QY0_jKaqokATg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXRp/bGx1c3RyYXRpb25z/LmNvbS9pbWFnZXMv/Y3VzdG9tLWRlc2ln/bi9jdXN0b20tZGVz/aWduLWlsbHVzdHJh/dGlvbnMtMy5wbmc",
            slug: "optimizing-web-performance",
            author: "Charlie Brown",
            date: "May 28, 2024",
          },
          {
            title: "Building Accessible Websites: Best Practices",
            description:
              "Learn the fundamentals of web accessibility and implement best practices to ensure your website is usable by everyone, regardless of ability.",
            imageUrl:
              "https://imgs.search.brave.com/lm4wtR5eR6df7vaykOaV8wC8UkVO3JmJxLM5ND1_1V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aW50/LmNyZWF0aXZlbWFy/a2V0LmNvbS9abndz/b2I0bzhrRlVkVlNN/MlFzU1JSQUZPVmxM/blI3Zkk0M0NyN2ZU/UVZVL3dpZHRoOjQ0/MC9oZWlnaHQ6Mjky/L2dyYXZpdHk6bm93/ZS9ydDpmaWxsLWRv/d24vZWw6MS9jek02/THk5bWFXeGxjeTVq/Y21WaGRHbDJaVzFo/Y210bGRDNWpiMjB2/YVcxaFoyVnpMM05q/Y21WbGJuTm9iM1J6/TDNCeWIyUjFZM1J6/THpVd09ERXZOVEE0/TVRjdk5UQTRNVGM0/TnpNdlkyRm1aUzF3/Y21WMmFXVjNMVEEx/TFc4dWFuQm5JekUz/TVRZek56Y3pNakU_/MTcxNjM3NzMyMQ",
            slug: "building-accessible-websites",
            author: "Diana Prince",
            date: "May 22, 2024",
          },
        ];
        setRecentPosts(simulatedPosts);

        // Set to false only AFTER authentication and data loading is complete
        setIsAuthenticating(false);
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem("authToken");
        router.push("/auth/signin");
      }
    };

    checkAuthAndLoadData();
  }, [router]);

  // Removed handleLogout as it's now handled by the Navbar component

  if (isAuthenticating) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/*
        Removed the fixed Dashboard header.
        The main Navbar now serves as the primary fixed header.
      */}

      {/* Main Content */}
      {/* Adjusted pt-value to account ONLY for the global Navbar's height.
          A Navbar with p-4 often means ~64px height. pt-16 (64px) should be enough,
          but pt-20 (80px) adds a little more breathing room below the Navbar.
          You might need to fine-tune this based on your actual Navbar's height. */}
      <main className="container mx-auto pt-20 px-6 sm:px-8 pb-6 sm:pb-8">
        {" "}
        {/* UPDATED LINE */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 leading-tight drop-shadow-md">
          Welcome, {userName || userEmail}!
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 drop-shadow-sm">
          This is your personalized dashboard. Here you can manage your
          settings, view data, and access exclusive content.
        </p>
        {/* --- Recent Posts / Cards Section --- */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-black dark:text-gray-100 mb-6 drop-shadow-sm">
            Your Recent Posts
          </h3>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <Card
                  key={index}
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  slug={post.slug}
                  author={post.author}
                  date={post.date}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              No posts to display yet.
            </p>
          )}
        </section>
        {/* --- Other Dashboard Cards/Sections --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Card for Profile - Updated for glassmorphism style */}
          <div
            className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         backdrop-filter backdrop-blur-md bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-white border-opacity-20 dark:border-gray-700 dark:border-opacity-30
                         flex flex-col h-full p-6 text-black dark:text-gray-100">
            <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">
              Your Profile
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Email:{" "}
              <span className="font-medium text-gray-600 dark:text-gray-200">
                {userEmail}
              </span>
            </p>
            <p className="text-gray-400 dark:text-gray-400">
              Name:{" "}
              <span className="font-medium text-gray-600 dark:text-gray-200">
                {userName || "Not provided"}
              </span>
            </p>
          </div>

          {/* Dashboard Card for Quick Links - Updated for glassmorphism style */}
          <div
            className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         backdrop-filter backdrop-blur-md bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-white border-opacity-20 dark:border-gray-700 dark:border-opacity-30
                         flex flex-col h-full p-6 text-black dark:text-gray-100">
            <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="list-disc list-inside text-blue-500 dark:text-blue-400 space-y-2">
              <li>
                <Link
                  href="/dashboard/settings"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 drop-shadow-sm">
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/reports"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 drop-shadow-sm">
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 drop-shadow-sm">
                  View Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboard Card for Recent Activity - Updated for glassmorphism style */}
          <div
            className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         backdrop-filter backdrop-blur-md bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-white border-opacity-20 dark:border-gray-700 dark:border-opacity-30
                         flex flex-col h-full p-6 text-black dark:text-gray-100">
            <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">
              Recent Activity
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              No recent activity to display.
            </p>
          </div>
        </section>
        {/* Protected Content Example - Updated for glassmorphism style */}
        <section
          className="mt-8 relative overflow-hidden rounded-lg shadow-xl
                     backdrop-filter backdrop-blur-md bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 border border-white border-opacity-20 dark:border-gray-700 dark:border-opacity-30
                     p-6 text-black dark:text-gray-100">
          <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">
            Protected Content Example
          </h3>
          <p className="text-gray-400 dark:text-gray-400">
            This content is only visible because you are logged in.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
