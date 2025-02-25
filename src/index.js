import "./reset/reset.css";
import "./styles.css";

const searchBarInput = document.querySelector(".search-bar");

searchBarInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const location = searchBarInput.value;
    updateWeather(location);
  }
});

async function getData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=WVJM9GQU4RXLX5M5LWCNQCH8D&contentType=json`,
  ).catch((errorMsg) => console.log(errorMsg));

  const data = await response.json();
  return data;
}

async function updateWeather(location = "Jakarta") {
  const data = await getData(location);

  const weatherData = data.currentConditions.conditions;
  const tempsData = data.currentConditions.temp;
  const humidityData = data.currentConditions.humidity;
  const locationData = data.address;
  const sunriseTimeData = data.currentConditions.sunrise;
  const sunsetTimeData = data.currentConditions.sunset;
  const feelsLikeTemp = data.currentConditions.feelslike;

  const currentLocation = document.querySelector(".current-location");
  currentLocation.textContent = locationData;

  const temperature = document.querySelector(".temp");
  temperature.textContent = tempsData;

  const weatherStatusDesc = document.querySelector(".weather-status-desc");
  weatherStatusDesc.textContent = weatherData;
  updateWeatherStatusPic(weatherData);

  const sunriseTime = document.querySelector(".sunrise-time");
  sunriseTime.textContent = sunriseTimeData;

  const sunsetTime = document.querySelector(".sunset-time");
  sunsetTime.textContent = sunsetTimeData;

  const humidityStatus = document.querySelector(".humidity-status");
  humidityStatus.textContent = humidityData;

  const precipitationStatus = document.querySelector(".temp-feelslike-status");
  precipitationStatus.textContent = feelsLikeTemp;
}

function updateWeatherStatusPic(weatherStatus, time) {
  const weatherStatusPic = document.querySelector(".weather-status-pic");
  if (weatherStatus == "Rain, Partially cloudy") {
    weatherStatusPic.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.316 21H5.212l.935-2h1.105zm2.065 2l1.871-4H9.147l-1.87 4zm3.468-1l1.403-3h-1.105l-1.403 3zm3.298-3l-2.339 5h1.105l2.339-5zm3 0l-.935 2h1.104l.936-2zm-11.28-1h-1.43a3.438 3.438 0 0 1 0-6.875l.012.001A3.369 3.369 0 0 1 9.4 9.24a5.494 5.494 0 0 1 10.548-.521A4.807 4.807 0 0 1 18.187 18zM3 14.562A2.44 2.44 0 0 0 5.438 17h12.75a3.807 3.807 0 0 0 1.394-7.351l-.429-.17-.15-.436a4.494 4.494 0 0 0-8.629.426l-.232.99-.986-.25a2.407 2.407 0 0 0-.594-.084 2.443 2.443 0 0 0-2.206 1.42l-.268.581h-.715A2.442 2.442 0 0 0 3 14.563z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>';
  } else if (weatherStatus == "Partially cloudy") {
    weatherStatusPic.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z"/></svg>';
  } else if (weatherStatus == "Rain") {
    weatherStatusPic.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.316 21H5.212l.935-2h1.105zm2.065 2l1.871-4H9.147l-1.87 4zm3.468-1l1.403-3h-1.105l-1.403 3zm3.298-3l-2.339 5h1.105l2.339-5zm3 0l-.935 2h1.104l.936-2zm-11.28-1h-1.43a3.438 3.438 0 0 1 0-6.875l.012.001A3.369 3.369 0 0 1 9.4 9.24a5.494 5.494 0 0 1 10.548-.521A4.807 4.807 0 0 1 18.187 18zM3 14.562A2.44 2.44 0 0 0 5.438 17h12.75a3.807 3.807 0 0 0 1.394-7.351l-.429-.17-.15-.436a4.494 4.494 0 0 0-8.629.426l-.232.99-.986-.25a2.407 2.407 0 0 0-.594-.084 2.443 2.443 0 0 0-2.206 1.42l-.268.581h-.715A2.442 2.442 0 0 0 3 14.563z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>';
  }
}

updateWeather();
