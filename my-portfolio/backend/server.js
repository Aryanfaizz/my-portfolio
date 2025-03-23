const express = require('express');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');
const fs = require('fs'); // Add fs to read JSON file

dotenv.config();
const app = express();
const PORT = 9000;

app.use(cors());

// Weather endpoint
app.get('/.netlify/functions/api/weather', async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=halifax,ca&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: {
        current: data.main.temp,
      },
      humidity: data.main.humidity,
    };

    console.log('Sending weather:', weatherData);
    res.json(weatherData);
  } catch (err) {
    console.error('Backend error:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// Projects endpoint
app.get('/.netlify/functions/api/projects', (req, res) => {
  try {
    const projectsData = fs.readFileSync('./projects.json', 'utf8');
    const projects = JSON.parse(projectsData);
    console.log('Sending projects:', projects); // Debug
    res.json(projects);
  } catch (err) {
    console.error('Projects error:', err.message);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});