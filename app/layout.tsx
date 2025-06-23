// app/layout.jsx
import "../app/globals.css";
import Navbar from "../components/Navbar";
import MovingBackground from "../components/MovingBackground";
import { ThemeProvider } from "../components/ThemeProvider";
import MouseGlow from "@/components/MouseGlow";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Uncomment this script to ensure the 'dark' class is applied instantly on page load.
          This prevents flashes of light theme and correctly displays dark-mode specific elements
          like MovingBackground.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Fallback to system preference if no theme is stored
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.classList.remove('light');
                    } else {
                      document.documentElement.classList.add('light');
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {
                  console.error('Failed to apply theme from localStorage:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <MovingBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <MouseGlow />
        </ThemeProvider>
      </body>
    </html>
  );
}
