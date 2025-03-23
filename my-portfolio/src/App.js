import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ThemeSwitcher from './components/ThemeSwitcher';
import SkillList from './components/SkillList';
import ProjectList from './components/ProjectList';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [theme]);

  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Navbar theme={theme} />
      <div className="container">
        <h1 className="text-center">My Portfolio</h1>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        
        <WeatherDisplay setLoading={setLoading} setError={setError} />
        {loading && <p className="text-center mt-3">Loading weather...</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}

        <SkillList theme={theme} />
        <ProjectList theme={theme} setLoading={setLoading} setError={setError} />
      </div>
    </div>
  );
}

export default App;