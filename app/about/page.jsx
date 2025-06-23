// app/about/page.jsx

import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="relative z-10 min-h-screen pt-24 sm:pt-32 pb-20 text-white dark:text-gray-100 flex flex-col items-center px-4 sm:px-8">
      <section className="w-full max-w-3xl mx-auto text-center bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {/* Updated gradient for consistency */}
          About MyDev Blog
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
          Welcome to MyDev Blog, your dedicated resource for all things web
          development. We're passionate about sharing knowledge, best practices,
          and insights to help developers of all levels grow their skills and
          stay ahead in the ever-evolving tech landscape.
        </p>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
          Our mission is to provide clear, concise, and actionable content on
          topics ranging from front-end frameworks like React and Next.js, to
          backend technologies, design principles, performance optimization, and
          much more.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800">
          {/* Updated button color to blue */}
          Contact Us
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
