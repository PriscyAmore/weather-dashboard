// app.js
async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  const resultDiv = document.getElementById("result");

  // Clear previous messages and reset input style
  resultDiv.innerHTML = "";
  cityInput.style.borderColor = "#ccc";

  if (!city) {
    resultDiv.innerHTML = "⚠️ Please enter a city.";
    cityInput.style.borderColor = "red";
    return;
  }

  // Show loading message
  resultDiv.innerHTML = "🌍 Loading weather data...";

  try {
    const apiKey = "614c7678556391f1b2c2e9bbc3140dde";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("Error fetching weather data. Please try again later.");
      }
    }

    const data = await response.json();

    resultDiv.innerHTML = `
      <p><strong>${data.name}, ${data.sys.country}</strong></p>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `❌ ${error.message}`;
    cityInput.style.borderColor = "red";
    console.error(error);
  }
}

// Set default city to Lagos on page load
window.addEventListener("load", function () {
  const defaultCity = "Lagos,NG";
  document.getElementById("city").value = defaultCity;
  getWeather();
});
