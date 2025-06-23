// components/MouseGlow.jsx
"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false); // To prevent SSR issues

  useEffect(() => {
    setIsMounted(true); // Component is mounted on the client

    const handleMouseMove = (e) => {
      // Update position based on mouse coordinates
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener when component mounts
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Don't render on the server, only when mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]" // High z-index to be on top, pointer-events-none to not interfere with clicks
      style={{
        // Position the glow slightly offset so the cursor is not directly on the center
        // Using transform for better performance than top/left
        transform: `translate(${position.x - 15}px, ${position.y - 15}px)`, // Adjusted offset for 30px size
        // Style for the glow effect
        width: "30px", // Base size
        height: "30px",
        borderRadius: "50%",
        // Increased opacity in rgba values and potentially adjusted colors for a darker feel
        background:
          "radial-gradient(circle, rgba(100,149,237,0.9) 0%, rgba(75,0,130,0.9) 50%, transparent 70%)",
        // Adjusted colors: 100,149,237 (Cornflower Blue) and 75,0,130 (Dark Orchid) - these are darker shades
        // Opacity increased to 0.9 from 0.8/0.7
        filter: "blur(10px)", // Slightly increased blur for a softer, more diffused glow
        opacity: 0.95, // Overall opacity of the div increased for a darker, more prominent effect
        transition:
          "transform 0.05s ease-out, width 0.1s ease-out, height 0.1s ease-out", // Reduced transform transition duration for higher speed
        // The scale(1.2) is already applied by you, so keeping it
      }}
    />
  );
};

export default MouseGlow;
