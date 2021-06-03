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



// API STUFF

// DISPLAYS TEMPERATURE OF USER'S INPUT CITY 

function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);

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

searchCity("Seattle");