import React from 'react';

function ThemeSwitcher({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="text-center mb-5">
      <button
        className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'} shadow`}
        onClick={toggleTheme}
        style={{ background: theme === 'dark' ? '#fff' : '#333', color: theme === 'dark' ? '#333' : '#fff' }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default ThemeSwitcher;