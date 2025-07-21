// Replace this with your actual API key
const API_KEY = "c086ac7723a11d257d9a35f55ca32060";

// Get weather by city name
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    // Current weather data
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    displayCurrentWeather(weatherData);

    // Forecast data
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    displayForecast(forecastData);
  } catch (error) {
    alert("City not found or error fetching data!");
    console.error(error);
  }
}

// Show current weather
function displayCurrentWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
document.getElementById("wind").textContent = `Wind: ${data.wind_speed} km/h`;
document.getElementById("pressure").textContent = `Pressure: ${data.pressure} hPa`;


function updateBackground(weatherCondition) {
  const body = document.body;
  body.className = ""; // Clear previous class

  const condition = weatherCondition.toLowerCase();

  if (condition.includes("clear")) body.classList.add("clear");
  else if (condition.includes("cloud")) body.classList.add("clouds");
  else if (condition.includes("rain")) body.classList.add("rain");
  else if (condition.includes("snow")) body.classList.add("snow");
  else if (condition.includes("thunderstorm")) body.classList.add("thunderstorm");
  else if (condition.includes("mist") || condition.includes("fog")) body.classList.add("mist");
}



updateBackground(data.weather[0].main);

}
// Show 5-day forecast (next 5 days at 12PM)
function displayForecast(data) {
  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));
  filtered.forEach(day => {
    const date = new Date(day.dt_txt).toDateString().slice(0, 10);
    const icon = day.weather[0].icon;
    const temp = Math.round(day.main.temp);

    const card = document.createElement("div");
    card.className = "forecast-day";
    card.innerHTML = `
      <p>${date}</p>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon" />
      <p>${temp}°C</p>
    `;
    forecastContainer.appendChild(card);
  });
}
