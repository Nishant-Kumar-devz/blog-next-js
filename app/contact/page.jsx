// app/contact/page.jsx

import Link from "next/link";

const ContactPage = () => {
  return (
    <main className="relative z-10 min-h-screen pt-24 sm:pt-32 text-gray-400 dark:text-gray-100 flex flex-col items-center px-4 sm:px-8">
      <section className="w-full max-w-3xl mx-auto text-center bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {/* Updated gradient for consistency */}
          Get in Touch
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-6">
          Have questions, suggestions, or just want to say hello? We'd love to
          hear from you!
        </p>

        <div className="mb-8">
          <p className="text-lg sm:text-xl font-semibold mb-2">Email Us:</p>
          <a target="_blank"
            href="mailto:nishantkumardevz@gmail.com"
            className="text-blue-400 hover:text-blue-700 transition duration-300 text-xl font-medium">
            {/* Adjusted hover state for better dark mode blend */}
            nishantkumardevz@gmail.com
          </a>
        </div>

        <div className="mb-8">
          <p className="text-lg sm:text-xl font-semibold mb-2">Follow Us:</p>
          <div className="flex justify-center space-x-6 text-2xl">
            {/* Placeholder for social media icons - replace with actual links/icons */}
            <a target="_blank"
              href="https://x.com/Nishantkumardev?t=OO_cRn6rt7Vavsn1_-A-GA&s=09"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-blue-300 transition duration-300">
              {/* Adjusted hover to a subtle blue in dark mode */}
              {/* Replace with actual social media icon from react-icons/fa */}
              <i className="fa-brands fa-twitter"></i> Twitter
            </a>
            <a target="_blank"
              href="https://www.linkedin.com/in/nishant-kumar-9b5a502b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-blue-300 transition duration-300">
              {/* Adjusted hover to a subtle blue in dark mode */}
              {/* Replace with actual social media icon */}
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a target="_blank"
              href="https://github.com/Nishant-Kumar-devz"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-blue-300 transition duration-300">
              {/* Adjusted hover to a subtle blue in dark mode */}
              {/* Replace with actual social media icon */}
              <i className="fab fa-github"></i> Github
            </a>
          </div>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-500">
          We aim to respond to all inquiries within 24-48 hours.
        </p>
      </section>
    </main>
  );
};

export default ContactPage;
