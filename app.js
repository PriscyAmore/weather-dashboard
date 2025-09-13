// app.js
async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city.";
    return;
  }

  try {
    // OpenWeatherMap API endpoint and key from your email
    const apiKey = "614c7678556391f1b2c2e9bbc3140dde";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    resultDiv.innerHTML = `
      <p><strong>${data.name}, ${data.sys.country}</strong></p>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `❌ ${error.message}`;
  }
}

// Set default city to Lagos on page load
window.addEventListener('load', function() {
  document.getElementById("city").value = "Lagos,NG";
  getWeather();
});
