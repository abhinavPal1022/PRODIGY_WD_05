const apiKey = "91deb6dd6939a0a0e55351c46dfe0a04";

// Real-time clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("clock").textContent = "Current Time: " + time;
}
setInterval(updateClock, 1000);
updateClock();

// Get weather data
function getWeather(city) {
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Current weather
  fetch(currentURL)
    .then(res => res.json())
    .then(data => {
      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
        <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
        <p>🌡 Temp: ${Math.round(data.main.temp)}°C</p>
        <p>⬆ Max: ${Math.round(data.main.temp_max)}°C ⬇ Min: ${Math.round(data.main.temp_min)}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
      `;
      document.getElementById("weatherResult").innerHTML = html;
    });

  // Forecast
  fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
      const forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
      let forecastHTML = "";

      forecastData.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
        forecastHTML += `
          <div class="forecast-item">
            <p>${date}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon">
            <p>${day.main.temp}°C</p>
          </div>
        `;
      });

      document.getElementById("forecast").innerHTML = forecastHTML;
    });
}

// Load default city on start
window.onload = () => {
  getWeather("Pune");
};
