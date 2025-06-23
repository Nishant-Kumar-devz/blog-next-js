// app/blog/[slug]/page.jsx

import Image from "next/image";
import Link from "next/link";

// Dummy blog data (ensure this matches the one in your Home page)
// In a real app, you'd fetch this from a database or CMS.
const blogPosts = [
  {
    id: 1,
    title: "Understanding Next.js App Router",
    description:
      "Dive deep into the new App Router in Next.js 13+, exploring its features, benefits, and how to migrate your existing projects.",
    content: `
      <p>The Next.js App Router, introduced in Next.js 13, represents a significant shift in how you build web applications with Next.js. It's built on React Server Components, offering new capabilities for data fetching, caching, and rendering.</p>
      <h2>Key Features</h2>
      <ul>
        <li><strong>Server Components:</strong> Render on the server, send only the necessary HTML and CSS to the client, leading to smaller JavaScript bundles.</li>
        <li><strong>Layouts:</strong> Share UI across multiple routes without re-rendering, improving performance.</li>
        <li><strong>Nested Routing:</strong> Create complex UI hierarchies that map directly to your file system.</li>
        <li><strong>Streaming:</strong> Render parts of your UI as they become ready, improving perceived performance.</li>
      </ul>
      <h2>Benefits</h2>
      <p>The App Router aims to provide a more performant and developer-friendly experience. By leveraging server components, you can keep more logic on the server, reducing the amount of JavaScript sent to the client. This leads to faster initial page loads and better Core Web Vitals.</p>
      <h3>Getting Started</h3>
      <p>To start with the App Router, ensure you're using Next.js 13 or later. New projects will use it by default. For existing projects, you can gradually migrate components and routes.</p>
      <p>The routing paradigm shifts from a 'pages' directory to an 'app' directory, where each folder represents a segment of the URL, and 'page.js' defines the UI for that segment.</p>
    `,
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
    content: `
      <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes that you can use to build custom designs directly in your markup.</p>
      <h2>Why Tailwind?</h2>
      <p>Unlike traditional CSS frameworks (like Bootstrap), Tailwind doesn't come with pre-built components. Instead, it provides a set of highly customizable utility classes (e.g., \`flex\`, \`pt-4\`, \`text-center\`, \`bg-blue-500\`) that allow you to build unique designs without writing custom CSS.</p>
      <h3>Benefits of a Utility-First Approach</h3>
      <ul>
        <li><strong>Faster Development:</strong> Build designs directly in your HTML/JSX without constantly switching between CSS files.</li>
        <li><strong>No More Class Names:</strong> Avoid thinking up semantic class names that often don't map well to your design.</li>
        <li><strong>Highly Customizable:</strong> Tailwind is extremely configurable, allowing you to define your design system (colors, spacing, fonts) and use those values across your project.</li>
        <li><strong>Smaller File Sizes:</strong> With PurgeCSS (built into Tailwind CLI and PostCSS setup), unused CSS is removed in production builds, leading to tiny CSS files.</li>
      </ul>
      <p>While the initial learning curve might involve getting used to writing many classes, the speed and flexibility it offers quickly make it a favorite for many developers.</p>
    `,
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
    content: `
      <p>Managing state in React applications can quickly become complex as your app grows. Choosing the right state management solution is crucial for maintainability and scalability.</p>
      <h2>Common Approaches</h2>
      <p>React provides built-in hooks like \`useState\` and \`useContext\` for local and global state management, respectively. For simple applications, these are often sufficient.</p>
      <h3>Advanced Solutions</h3>
      <ul>
        <li><strong>Redux:</strong> A predictable state container for JavaScript apps. It's robust and widely used, especially for large applications, but can involve more boilerplate.</li>
        <li><strong>Zustand:</strong> A small, fast, and scalable bear-necessities state management solution. It's often favored for its simplicity and less boilerplate compared to Redux.</li>
        <li><strong>Recoil:</strong> A state management library for React from Facebook, focusing on atomic state management, allowing for fine-grained updates.</li>
        <li><strong>Jotai:</strong> A primitive and flexible state management library inspired by Recoil.</li>
      </ul>
      <p>The best solution depends on your project's size, team familiarity, and specific requirements. Start simple, and introduce more complex solutions as needed.</p>
    `,
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
    content: `
      <p>When building web applications, choosing the right API architecture is a fundamental decision. The two most prominent choices are REST (Representational State Transfer) and GraphQL.</p>
      <h2>RESTful APIs</h2>
      <p>REST APIs are based on standard HTTP methods (GET, POST, PUT, DELETE) and resources identified by URLs. They are stateless, scalable, and widely understood.</p>
      <h3>Pros of REST</h3>
      <ul>
        <li>Simplicity and widespread adoption.</li>
        <li>Built on standard HTTP, easy to cache.</li>
        <li>Good for simple resource-based operations.</li>
      </ul>
      <h3>Cons of REST</h3>
      <ul>
        <li><strong>Over-fetching/Under-fetching:</strong> Clients often get more or less data than they need, leading to multiple requests.</li>
        <li>Less flexible for complex queries.</li>
      </ul>
      <h2>GraphQL APIs</h2>
      <p>GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.</p>
      <h3>Pros of GraphQL</h3>
      <ul>
        <li><strong>Exact Data Fetching:</strong> Clients request exactly what they need, minimizing over-fetching.</li>
        <li>Single endpoint for all queries.</li>
        <li>Strongly typed schema provides clear API contracts.</li>
      </ul>
      <h3>Cons of GraphQL</h3>
      <ul>
        <li>Can be more complex to set up initially.</li>
        <li>Caching can be more challenging compared to REST.</li>
      </ul>
      <p>The choice often depends on your project's needs. GraphQL excels when clients need to fetch diverse data efficiently with fewer requests, while REST is great for simpler, resource-oriented interactions.</p>
    `,
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
    content: `
      <p>Web performance is critical for user satisfaction, SEO, and conversion rates. A fast website provides a better user experience and helps achieve business goals.</p>
      <h2>Performance Checklist</h2>
      <ol>
        <li><strong>Image Optimization:</strong>
          <ul>
            <li>Compress images (e.g., WebP, AVIF).</li>
            <li>Use responsive images (\`srcset\`, \`sizes\`).</li>
            <li>Lazy load offscreen images.</li>
          </ul>
        </li>
        <li><strong>Code Splitting:</strong>
          <ul>
            <li>Break down JavaScript bundles into smaller chunks.</li>
            <li>Load only the code needed for the current view.</li>
          </ul>
        </li>
        <li><strong>Browser Caching:</strong>
          <ul>
            <li>Leverage browser caching for static assets (images, CSS, JS).</li>
            <li>Set appropriate \`Cache-Control\` headers.</li>
          </ul>
        </li>
        <li><strong>Minimize CSS & JavaScript:</strong>
          <ul>
            <li>Minify and compress your code.</li>
            <li>Remove unused CSS/JS (e.g., using PurgeCSS with Tailwind).</li>
          </ul>
        </li>
        <li><strong>Reduce Server Response Time:</strong>
          <ul>
            <li>Optimize backend code and database queries.</li>
            <li>Use a CDN for static content.</li>
          </ul>
        </li>
        <li><strong>Critical CSS:</strong>
          <ul>
            <li>Inline critical CSS for above-the-fold content.</li>
            <li>Defer non-critical CSS.</li>
          </ul>
        </li>
      </ol>
      <p>Regularly audit your website with tools like Lighthouse or WebPageTest to identify bottlenecks and track improvements.</p>
    `,
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
    content: `
      <p>Web accessibility (often abbreviated as A11y) is the practice of ensuring that websites and web applications are usable by people with disabilities. This includes people with visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
      <h2>Why Accessibility Matters</h2>
      <ul>
        <li><strong>Inclusivity:</strong> Everyone deserves equal access to information and services online.</li>
        <li><strong>Legal Compliance:</strong> Many regions have laws requiring digital accessibility.</li>
        <li><strong>SEO Benefits:</strong> Many accessibility practices overlap with good SEO practices.</li>
        <li><strong>Improved User Experience:</strong> Accessible sites are often more usable for everyone.</li>
      </ul>
      <h2>Best Practices</h2>
      <ol>
        <li><strong>Semantic HTML:</strong> Use appropriate HTML tags (\`<\`header\`>\`, \`<\`nav\`>\`, \`<\`main\`>\`, \`<\`footer\`>\`, \`<\`button\`>\`, \`<\`a\`>\`) to convey meaning.</li>
        <li><strong>Alt Text for Images:</strong> Provide descriptive \`alt\` attributes for all meaningful images.</li>
        <li><strong>Keyboard Navigation:</strong> Ensure all interactive elements are reachable and operable via keyboard.</li>
        <li><strong>Color Contrast:</strong> Maintain sufficient contrast between text and background colors.</li>
        <li><strong>Form Labels:</strong> Use \`<\`label\`>\` elements for form controls.</li>
        <li><strong>ARIA Attributes:</strong> Use WAI-ARIA attributes when semantic HTML isn't sufficient to convey meaning.</li>
        <li><strong>Focus Management:</strong> Manage focus logically, especially after user interactions or route changes.</li>
        <li><strong>Transcripts/Captions for Media:</strong> Provide alternatives for audio and video content.</li>
      </ol>
      <p>Building accessible websites is not just about compliance; it's about building a better web for everyone.</p>
    `,
    imageUrl:
      "https://imgs.search.brave.com/lm4wtR5eR6df7vaykOaV8wC8UkVO3JmJxLM5ND1_1V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aW50/LmNyZWF0aXZlbWFy/a2V0LmNvbS9abndz/b2I0bzhrRlVkVlNN/MlFzU1JSQUZPVmxM/blI3Zkk0M0NyN2ZU/UVZVL3dpZHRoOjQ0/MC9oZWlnaHQ6Mjky/L2dyYXZpdHk6bm93/ZS9ydDpmaWxsLWRv/d24vZWw6MS9jek02/THk5bWFXeGxjeTVq/Y21WaGRHbDJaVzFo/Y210bGRDNWpiMjB2/YVcxaFoyVnpMM05q/Y21WbGJuTm9iM1J6/TDNCeWIyUjFZM1J6/THpVd09ERXZOVEE0/TVRjdk5UQTRNVGM0/TnpNdlkyRm1aUzF3/bW1WMmFXVjNMVEEx/TFc4dWFuQm5JekUz/TVRZek56Y3pNakU_/MTcxNjM3NzMyMQ",
    slug: "building-accessible-websites",
    author: "Diana Prince",
    date: "May 22, 2024",
  },
];

// This function tells Next.js which paths to pre-render at build time (SSG)
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// The dynamic page component
// It receives 'params' containing the dynamic segments (e.g., { slug: 'post-title' })
interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;

  // Find the blog post that matches the slug
  const post = blogPosts.find((p) => p.slug === slug);

  // Handle case where post is not found (e.g., 404 page)
  if (!post) {
    return (
      <main className="min-h-screen sm: flex flex-col items-center justify-center text-blue-500 dark:text-gray-100 ">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Post Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The blog post you are looking for does not exist.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800">
          Back to Blog Posts
        </Link>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen pt-24 sm:pt-24 pb-20 text-white dark:text-gray-100 flex flex-col items-center px-4 sm:px-8">
      <article className="w-full max-w-4xl mx-auto bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 mb-8 border border-white border-opacity-20 dark:border-gray-700 dark:border-opacity-30">
        {/* Blog Post Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-6 shadow-md">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        </div>

        {/* Blog Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500">
            {post.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400">
            By <span className="font-semibold">{post.author}</span> on{" "}
            <time dateTime={new Date(post.date).toISOString().split("T")[0]}>
              {post.date}
            </time>
          </p>
        </header>

        {/* Blog Post Content (using dangerouslySetInnerHTML) */}
        <div
          className="prose prose-invert prose-lg text-gray-700 dark:text-gray-300 max-w-none
                     prose-h2:text-blue-200 dark:prose-h2:text-blue-300
                     prose-h3:text-purple-200 dark:prose-h3:text-purple-300
                     prose-ul:list-disc prose-ul:pl-5
                     prose-ol:list-decimal prose-ol:pl-5
                     prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to Blog Button */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg
                     dark:bg-blue-700 dark:hover:bg-blue-800">
            Back to Blog Posts
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogDetailPage;
