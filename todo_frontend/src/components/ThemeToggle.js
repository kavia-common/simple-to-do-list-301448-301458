import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
/**
 * ThemeToggle component - A button to toggle between light and dark themes with animation
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    // Trigger animation
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
    
    // Toggle theme
    toggleTheme();
  };

  return (
    <button
      className={`theme-toggle ${isTransitioning ? 'transitioning' : ''}`}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
