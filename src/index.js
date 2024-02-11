// function to make api call and update ui
function searchCity(city) {
  let apiKey = "td12219cocbbf408aab83b0d80f7ae3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

//response function for handling API call, receives response(JSON object)
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-place");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let IconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  //inject the information from the API
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}Kp/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  IconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="emoji" />`;
}

// search engine function for handling event listener action
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city");

  searchCity(searchInputElement.value);
}

//date function
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

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

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// search engine selector and adding event listener
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);




//function call

searchCity("Mombasa");

