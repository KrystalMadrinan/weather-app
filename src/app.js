// Feature #1 - Display current date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let today = date.getDate();

  let month = months[date.getMonth()];

  let day = days[currentDate.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${today} ${month} ${hours}:${minutes}`;
}

let todaysDate = document.querySelector("p#current-date");
let currentDate = new Date();
todaysDate.innerHTML = formatDate(currentDate);

// Feature #2 Add search engine and display input after user submits form

function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("h1");
  let userCity = document.getElementById("input-city").value;
  newCity.innerHTML = userCity;

  searchCity(userCity);
}

function searchCity(city) {
  let apiKey = "4c4c1ee1650eba4e1e4b0f6bede54f63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("button#search");
searchButton.addEventListener("click", updateCity);

// DISPLAYS TEMPERATURE OF USER'S INPUT CITY

function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  console.log(response.data);
  let cityTemp = document.querySelector("span#current-temp");
  cityTemp.innerHTML = `${currentTemp}`;

  let newCity = document.querySelector("h1");
  newCity.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
}

// DISPLAYS USER'S CURRENT LOCATION NAME

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4c4c1ee1650eba4e1e4b0f6bede54f63";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(url).then(showWeather);
}

// DISPLAYS USER'S CURRENT CITY TEMPERATURE AND NAME

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let button = document.querySelector("button#current-weather");
button.addEventListener("click", getPosition);

// CONVERT FAHRENHEIT TO CELSIUS

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

// CONVERT CELSIUS TO FAHRENHEIT

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

// SHOW FORECAST

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <i class="fas fa-cloud"></i>
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">75˚</span>
                  <span class="weather-forecast-temp-min">60˚</span>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

searchCity("Seattle");
displayForecast();
