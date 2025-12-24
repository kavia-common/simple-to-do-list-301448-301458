import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
/**
 * ThemeToggle component - Compact icon button to toggle between light and dark themes.
 * Accessible label and minimal motion.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
