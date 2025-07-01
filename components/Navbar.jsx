// components/Navbar.jsx
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const homePage = "/";

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check auth status and update state
  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Initial theme setup
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(currentTheme);

    // Check auth status:
    // 1. On initial mount.
    // 2. Whenever the 'pathname' (URL route) changes, which happens after login redirect.
    checkAuthStatus();

    // Listen for storage changes from OTHER tabs/windows.
    // This listener catches changes if the user logs in/out from a different browser tab.
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [pathname]); // KEY CHANGE: Added pathname to the dependency array

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/auth/signin");
  };

  const navBgColor =
    theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.2)";

  const linkClass = (path) =>
    cn(
      pathname === path
        ? "text-blue-600 dark:text-red-300 transition duration-300 text-lg font-medium relative group drop-shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300 text-lg font-medium relative group drop-shadow-sm"
    );

  const mobileLinkClass = (path) =>
    cn(
      pathname === path
        ? "block text-blue-600 dark:text-red-300 px-4 py-2 text-lg transition duration-300 drop-shadow-sm"
        : "block hover:text-black dark:hover:text-white px-4 py-2 text-lg transition duration-300 drop-shadow-sm"
    );

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav
        className="relative z-10 p-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px) saturate(180%)",
          WebkitBackdropFilter: "blur(10px) saturate(180%)",
          backgroundColor: navBgColor,
        }}>
        <div className="container mx-auto flex justify-between items-center relative">
          <div className="text-black dark:text-white text-3xl font-extrabold tracking-wide z-10 drop-shadow-md">
            <Link href="/">MyBlog</Link>
          </div>

          <div className="hidden md:flex justify-center flex-grow">
            <div className="space-x-8">
              <Link href="/" className={linkClass(homePage)}>
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/blog" className={linkClass("/blog")}>
                Blog
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/about" className={linkClass("/about")}>
                About
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/contact" className={linkClass("/contact")}>
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              {isLoggedIn && (
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 z-10">
            <button
              onClick={toggleTheme}
              className="text-black dark:text-white focus:outline-none">
              {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="relative px-5 py-2 group overflow-hidden font-semibold rounded-lg text-white text-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5
                           bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-pink-400">
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="relative px-5 py-2 group overflow-hidden font-semibold rounded-lg text-white text-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5
                             bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-purple-400">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="relative px-5 py-2 group overflow-hidden font-semibold rounded-lg text-white text-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5
                             bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 dark:focus:ring-teal-400">
                  Sign Up
                </Link>
              </>
            )}
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
        </div>

        {isOpen && (
          <div
            className="md:hidden mt-4 py-4 space-y-4 text-center rounded-lg shadow-xl animate-fade-in"
            style={{
              backdropFilter: "blur(10px) saturate(180%)",
              WebkitBackdropFilter: "blur(10px) saturate(180%)",
              backgroundColor: navBgColor,
            }}>
            <Link
              href="/"
              className={mobileLinkClass(homePage)}
              onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/blog"
              className={mobileLinkClass("/blog")}
              onClick={toggleMenu}>
              Blog
            </Link>
            <Link
              href="/about"
              className={mobileLinkClass("/about")}
              onClick={toggleMenu}>
              About
            </Link>
            <Link
              href="/contact"
              className={mobileLinkClass("/contact")}
              onClick={toggleMenu}>
              Contact
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={mobileLinkClass("/dashboard")}
                onClick={toggleMenu}>
                Dashboard
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/signin"
                  className="w-full text-center block px-4 py-2 font-semibold rounded-md text-white text-md shadow-md
                             bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
                  onClick={toggleMenu}>
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full text-center block px-4 py-2 font-semibold rounded-md text-white text-md shadow-md
                             bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition duration-300"
                  onClick={toggleMenu}>
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-semibold rounded-md text-white text-md shadow-md
                           bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition duration-300">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
