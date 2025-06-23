// app/blog/page.jsx

import Card from '@/components/Card';
import Link from 'next/link';

// Dummy blog data (ensure this is consistent across your app or fetched globally)
const blogPosts = [
  {
    id: 1,
    title: "Understanding Next.js App Router",
    description:
      "Dive deep into the new App Router in Next.js 13+, exploring its features, benefits, and how to migrate your existing projects.",
    content: `...`, // Content for detail page, not needed here
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
    content: `...`,
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
    content: `...`,
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
    content: `...`,
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
    content: `...`,
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
    content: `...`,
    imageUrl:
      "https://imgs.search.brave.com/EKManMje_KdjjFJVXGWmYtgkemZhXsD4MP5iPqOuxnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMz/NTI5NTI3MC9waG90/by9nbG9iYWwtY29u/bmVjdGlvbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9cFZJ/YXRSOFhjaWhxS1RE/bklTWVhOV3ZTa3Ba/a2RlSkphM1lOZms5/ekM2Zz0",
    slug: "building-accessible-websites",
    author: "Diana Prince",
    date: "May 22, 2024",
  },
];


const BlogPage = () => {
  return (
    <main className="relative z-10 min-h-screen pt-24 sm:pt-34 pb-20 text-white dark:text-gray-100 flex flex-col items-center px-4 sm:px-8">
      <section className="w-full max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 leading-tight">
          All Blog Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
};

export default BlogPage;