const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const pathName = event.path.split('/').pop(); 
  try {
    if (pathName === 'weather') {
      const apiKey = process.env.WEATHER_API_KEY;
      if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'WEATHER_API_KEY not set' }) };
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=halifax,ca&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const weatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: { current: data.main.temp },
        humidity: data.main.humidity,
      };
      console.log('Sending weather:', weatherData);
      return {
        statusCode: 200,
        body: JSON.stringify(weatherData),
      };
    } else if (pathName === 'projects') {
      const filePath = path.resolve(__dirname, 'projects.json'); // Use absolute path
      console.log('Attempting to read projects.json from:', filePath);
      if (!fs.existsSync(filePath)) {
        console.error('projects.json not found at:', filePath);
        return { statusCode: 500, body: JSON.stringify({ error: 'projects.json file not found' }) };
      }
      const projectsData = fs.readFileSync(filePath, 'utf8');
      const projects = JSON.parse(projectsData);
      console.log('Sending projects:', projects);
      return {
        statusCode: 200,
        body: JSON.stringify(projects),
      };
    }
    return { statusCode: 404, body: 'Not Found' };
  } catch (err) {
    console.error('Backend error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};