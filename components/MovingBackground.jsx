// components/MouseGlow.jsx
"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  // Removed theme state as we're going for a consistent blue across themes,
  // adjusting opacity for subtlety rather than a full color inverse.
  // const [theme, setTheme] = useState("dark"); // No longer needed for color logic

  useEffect(() => {
    setIsMounted(true); // Component is mounted on the client

    // Removed theme detection logic as it's not needed for static color
    // const updateTheme = () => { /* ... */ };
    // updateTheme();
    // const observer = new MutationObserver((mutations) => { /* ... */ });
    // observer.observe(document.documentElement, { attributes: true });

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // observer.disconnect(); // No longer needed
    };
  }, []); // Empty dependency array means this effect runs once on mount/cleanup

  // Don't render on the server, only when mounted on the client
  if (!isMounted) {
    return null;
  }

  // Define the blue-600 equivalent color with adjusted opacity for the glow.
  // Tailwind's blue-600 is #2563EB. We'll use its RGB values.
  // Using a lower opacity (e.g., 0.2) for a very subtle effect.
  const subtleBlue = "rgba(37, 99, 235, 1)"; // blue-600 with 20% opacity
  const transparent = "transparent";

  // Creating a radial gradient from the subtle blue to transparent
  const glowBackground = `radial-gradient(circle, ${subtleBlue} 0%, ${transparent} 100%)`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x - 10}px, ${position.y - 9}px)`,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: glowBackground, // Consistent subtle blue glow
        // filter: "blur(10px)", // Maintained high blur for diffused effect
        opacity: 1, // Overall opacity can be 1, as the color itself has transparency
        transition: "transform 0.05s ease-out", // Only transition transform for speed
      }}
    />
  );
};

export default MouseGlow;
