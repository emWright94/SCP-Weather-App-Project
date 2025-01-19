function updateWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let temperature = response.data.temperature.current;
  let humidityElement = document.querySelector("#humidity-percentage");
  let windSpeedElement = document.querySelector("#wind-mph");
  let windSpeed = response.data.wind.speed;
  let dayTimeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = Math.round(windSpeed);
  dayTimeElement.innerHTML = formatDayTime(date);
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji"/>`;

  console.log(response.data);
}

function formatDayTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours > 12) {
    hours = hours - 12;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "fa01ob92afac42305bb6e069bt2408b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Greenwich");
