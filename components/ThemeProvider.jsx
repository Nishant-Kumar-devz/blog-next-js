// components/ThemeProvider.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default theme
  const [mounted, setMounted] = useState(false); // State to track if component is mounted on client

  useEffect(() => {
    // Only run on client-side
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      // Directly apply class here for initial load to avoid FOUC (Flash of Unstyled Content)
      document.documentElement.classList.add(storedTheme);
      document.documentElement.classList.remove(storedTheme === 'light' ? 'dark' : 'light');
    } else {
      // Apply system preference if no stored theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.add(initialTheme);
    }
  }, []); // Run once on mount

  useEffect(() => {
    if (!mounted) return; // Don't run on server
    // Update localStorage and <html> class when theme state changes
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}