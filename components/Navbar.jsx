// components/Navbar.jsx
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const homePage = "/";

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Local state for immediate UI feedback

  // This effect synchronizes local state with the actual DOM class and localStorage
  // It runs AFTER the initial render, so the inline script in layout.jsx handles the very first load.
  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(currentTheme); // Initialize theme state from actual DOM
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // Update local state
    localStorage.setItem("theme", newTheme); // Persist to localStorage

    // Manually toggle class on <html> to ensure immediate visual update
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* MovingBackground is now handled in layout.jsx or its visibility controlled by dark:block */}
      <nav
        className="relative z-10 p-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px) saturate(180%)",
          WebkitBackdropFilter: "blur(10px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Base for glass, adjust for dark if needed
        //   border: "1px solid rgba(255, 255, 255, 0.2)",
        }}>
        <div className="container mx-auto flex justify-between items-center relative">
          <div className="text-black dark:text-white text-3xl font-extrabold tracking-wide z-10 ">
            <Link href="/">MyBlog</Link>
          </div>

          <div className="hidden md:flex justify-center flex-grow">
            <div className="space-x-8">
              <Link
                href="/"
                className={cn(
                  pathname === homePage
                    ? "text-blue-600 dark:text-red-300 transition duration-300 text-lg font-medium relative group"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300 text-lg font-medium relative group"
                )}>
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/blog"
                className={cn(
                  pathname === "/blog"
                    ? "text-blue-600 dark:text-red-300 transition duration-300 text-lg font-medium relative group"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300 text-lg font-medium relative group"
                )}>
                Blog
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/about"
                className={cn(
                  pathname === "/about"
                    ? "text-blue-600 dark:text-red-300 transition duration-300 text-lg font-medium relative group"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300 text-lg font-medium relative group"
                )}>
                About
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className={cn(
                  pathname === "/contact"
                    ? "text-blue-600 dark:text-red-300 transition duration-300 text-lg font-medium relative group"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300 text-lg font-medium relative group"
                )}>
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden z-10 space-x-4">
            <button
              onClick={toggleTheme}
              className="text-black dark:text-white focus:outline-none">
              {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-black dark:text-white focus:outline-none">
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>

          <div className="hidden md:block z-10">
            <button
              onClick={toggleTheme}
              className="text-black dark:text-white focus:outline-none">
              {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className="md:hidden bg-gray-800 dark:bg-gray-900 text-gray-500 dark:text-gray-300 mt-4 py-4 space-y-4 text-center rounded-lg shadow-xl animate-fade-in"
            style={{
              backdropFilter: "blur(10px) saturate(180%)",
              WebkitBackdropFilter: "blur(10px) saturate(180%)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            //   border: "1px solid rgba(255, 255, 255, 0.2)",
            }}>
            <Link
              href="/"
              className={cn(
                pathname === homePage
                  ? "block text-blue-600 dark:text-red-300 px-4 py-2 text-lg transition duration-300"
                  : "block hover:text-black dark:hover:text-white px-4 py-2 text-lg transition duration-300"
              )}
              onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/blog"
              className={cn(
                pathname === "/blog"
                  ? "block text-blue-600 dark:text-red-300 px-4 py-2 text-lg transition duration-300"
                  : "block hover:text-black dark:hover:text-white px-4 py-2 text-lg transition duration-300"
              )}
              onClick={toggleMenu}>
              Blog
            </Link>
            <Link
              href="/about"
              className={cn(
                pathname === "/about"
                  ? "block text-blue-600 dark:text-red-300 px-4 py-2 text-lg transition duration-300"
                  : "block hover:text-black dark:hover:text-white px-4 py-2 text-lg transition duration-300"
              )}
              onClick={toggleMenu}>
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                pathname === "/contact"
                  ? "block text-blue-600 dark:text-red-300 px-4 py-2 text-lg transition duration-300"
                  : "block hover:text-black dark:hover:text-white px-4 py-2 text-lg transition duration-300"
              )}
              onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
