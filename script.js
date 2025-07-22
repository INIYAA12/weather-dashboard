
const API_KEY = "c086ac7723a11d257d9a35f55ca32060";

// ✅ Default background on page load
window.onload = () => {
  document.body.style.background = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80') no-repeat center center/cover";
};

// 🔍 Fetch weather data
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    displayCurrentWeather(weatherData);

    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    displayForecast(forecastData);
  } catch (error) {
    alert("City not found or error fetching data!");
    console.error(error);
  }
}

// 🌤️ Display current weather
function displayCurrentWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
const celsius = Math.round(data.main.temp);
const fahrenheit = Math.round((celsius * 9) / 5 + 32);

document.getElementById("temperature").textContent = `${celsius}°C`;
document.getElementById("fahrenheit").textContent = `${fahrenheit}°F`;

const now = new Date();
const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };


  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // ✅ Show humidity, wind, pressure
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} km/h`;
  document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;

  // 🎨 Update background image
  setBackgroundImage(data.weather[0].description);
}

// 🖼️ Set background based on weather
function setBackgroundImage(description) {
  const body = document.body;
  const weather = description.toLowerCase();

  body.className = ""; // Clear previous styles

  if (weather.includes("clear")) {
    body.style.background = "url('images/clear.jpg') no-repeat center center/cover";
  } else if (weather.includes("cloud")) {
    body.style.background = "url('images/cloudy.jpg') no-repeat center center/cover";
  } else if (weather.includes("rain")) {
    body.style.background = "url('images/rain.jpg') no-repeat center center/cover";
  } else if (weather.includes("snow")) {
    body.style.background = "url('images/snow.jpg') no-repeat center center/cover";
  } else if (weather.includes("thunder")) {
    body.style.background = "url('images/thunder.jpg') no-repeat center center/cover";
  } else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
    body.style.background = "url('images/mist.jpg') no-repeat center center/cover";
  } else {
    // 🌄 Keep the original Unsplash image as fallback
    body.style.background = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80') no-repeat center center/cover";
  }
}


// 📆 Display 7-day forecast
function displayForecast(data) {
  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  // Filter 12 PM data entries for next 7 days
  const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 7);

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
// ⏰ Update live clock
setInterval(() => {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  document.getElementById("clockDisplay").textContent = now.toLocaleTimeString("en-US", options);
}, 1000);
