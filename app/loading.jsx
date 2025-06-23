// app/loading.jsx
"use client"; // This is a Client Component because it uses client-side interactivity like animations

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="relative flex h-24 w-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-transparent border-t-blue-500 animate-spin"></div>

          {/* Inner Ring */}
          <div className="absolute inset-4 rounded-full border-4 border-t-4 border-transparent border-t-purple-500 animate-spin-reverse"></div>

          {/* Center Glow (Optional) */}
          <div className="absolute inset-8 rounded-full bg-blue-400 bg-opacity-30 filter blur-sm"></div>
        </div>
        <p className="mt-4 text-xl font-semibold text-blue-200 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
