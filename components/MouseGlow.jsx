// components/MouseGlow.jsx
"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false); // To prevent SSR issues
  const [isMouseDevice, setIsMouseDevice] = useState(false); // New state to track if it's a mouse-enabled device

  useEffect(() => {
    setIsMounted(true); // Component is mounted on the client

    // Detect if the device has a fine pointer (mouse)
    // 'pointer: fine' indicates a mouse or stylus
    // 'any-pointer: fine' covers cases where primary input is touch but a mouse is also connected
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (any-pointer: fine)"
    );

    const checkPointerType = () => {
      setIsMouseDevice(mediaQuery.matches);
    };

    // Initial check
    checkPointerType();

    // Listen for changes in pointer capabilities (e.g., connecting/disconnecting a mouse)
    mediaQuery.addEventListener("change", checkPointerType);

    const handleMouseMove = (e) => {
      // Update position based on mouse coordinates
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Only add mousemove listener if it's detected as a mouse device
    if (isMouseDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Clean up event listeners when component unmounts or pointer type changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", checkPointerType);
    };
  }, [isMouseDevice]); // Re-run effect if isMouseDevice changes

  // Don't render on the server, only when mounted on the client
  // Also, don't render if it's not a mouse-enabled device
  if (!isMounted || !isMouseDevice) {
    return null;
  }

  // Define the blue-600 equivalent color with adjusted opacity for the glow.
  // Tailwind's blue-600 is #2563EB. We'll use its RGB values.
  // Using a lower opacity (e.g., 0.2) for a very subtle effect.
  const subtleBlue = "rgba(37, 99, 235, 1)"; // blue-600 with 100% opacity for the initial color
  const transparent = "transparent";

  // Creating a radial gradient from the subtle blue to transparent
  // Make sure the transparent part covers a larger portion for a softer fade
  const glowBackground = `radial-gradient(circle, ${subtleBlue} 0%, ${transparent} 70%)`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x - 10}px, ${position.y - 9}px)`,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: glowBackground,
        filter: "blur(10px)", // Maintained high blur for diffused effect
        opacity: 0.2, // Overall opacity of the div, making the blue more subtle
        transition: "transform 0.05s ease-out",
      }}
    />
  );
};

export default MouseGlow;
