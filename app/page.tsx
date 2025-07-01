// app/page.js (for App Router) or pages/index.js (for Pages Router)
import Card from "@/components/Card"; // Adjust path if necessary
import Link from "next/link";

// Dummy blog data (can be imported from a separate file)
const blogPosts = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

export default function Home() {
  return (
    <main
      className="relative min-h-screen px-4 sm:px-8 py-3 pb-20
                     bg-gradient-to-br from-indigo-100 via-purple-500 to-pink-500
                     dark:from-black dark:via-black dark:to-black
                     overflow-hidden text-white dark:text-gray-100">
      {/* Background circles for visual interest (matching signin and signup) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      {/* Hero Section */}
      <section className="text-center mb-16 pt-24 sm:pt-32 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 leading-tight">
          Welcome to MyDev Blog
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-600 mb-8">
          Your go-to source for insights into web development, programming, and
          tech trends. Stay updated with our latest articles and tutorials.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg
          dark:bg-blue-700 dark:hover:bg-blue-800">
          Explore All Posts
        </Link>
      </section>

      {/* Popular Blogs Section */}
      <section className="w-full max-w-7xl mx-auto">
        {" "}
        {/* <--- Added mx-auto here */}
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-gray-100">
          Popular Posts
        </h2>
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              slug={post.slug}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
