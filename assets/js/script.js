const currentWeatherContainer = $("#current-weather-container");
const currentStatsContainer = $("#current-stats-container");
const mainForecastCardContainer = $("#weather-forecast-card-container");
const currentDayTimeContainer = $("current-day-time-container");
const API_KEY = "4b78eb4a041f6b18c48e4d3b7d624d8d";

const getCurrentData = function (name, forecastData) {
  return {
    name: name,
    temperature: forecastData.current.temp,
    wind: forecastData.current.wind_speed,
    humidity: forecastData.current.humidity,
    uvi: forecastData.current.uvi,
    feels_like: forecastData.current.feels_like,
    desc: forecastData.current.weather[0].description,
    sunset: getFormattedDate(forecastData.current.sunset, "HH:mm"),
    sunrise: getFormattedDate(forecastData.current.sunrise, "HH:mm"),
    date: getFormattedDate(forecastData.current.dt, "dddd Do MMMM YY"),
    time: getFormattedDate(forecastData.current.dt, "HH:mm"),
    iconCode: forecastData.current.weather[0].icon,
  };
};

const getFormattedDate = function (unixTimestamp, format) {
  return moment.unix(unixTimestamp).format(format);
};

const getForecastData = function (forecastData) {
  const callback = function (each) {
    console.log(each);
    return {
      date: getFormattedDate(each.dt, "ddd DD/MM"),
      temperature: each.temp.max,
      wind_speed: each.wind_speed,
      humidity: each.humidity,
      iconCode: each.weather[0].icon,
    };
  };

  // $("#currentDay").text.getFormattedDate(
  //   forecastData.current.dt,
  //   "dddd DD mmmm"
  // );

  return forecastData.daily.slice(1, 6).map(callback);
};

const getWeatherData = async (cityName) => {
  //   1st api call
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  const currentDataResponse = await fetch(currentUrl);
  const currentData = await currentDataResponse.json();
  const lat = currentData.coord.lat;
  const lon = currentData.coord.lon;
  const name = currentData.name;

  // 2nd api call
  const forecastUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  const forecastDataResponse = await fetch(forecastUrl);
  const forecastData = await forecastDataResponse.json();

  const current = getCurrentData(name, forecastData);
  const forecast = getForecastData(forecastData);

  return {
    current: current,
    forecast: forecast,
  };
};

// construct current weather card
const renderCurrentWeatherCard = function (currentData) {
  const currentWeatherCard = `<h1 class="pl-3 title-city">${currentData.name}</h1>
    <div class="column temp-icon-wrapper">
        <div class="ml-4 current-temp-container">
        <p class="temp-display">${currentData.temperature}&deg</p>
        <p class="subtitle">${currentData.feels_like}</p>
        </div>
        <div class="ml-4 current-weather-icon-container">
        <img src="https://openweathermap.org/img/w/${currentData.iconCode}.png" class="mb-4 current-icon"/>
        <p class="subtitle">${currentData.desc}</p>
        </div>
    </div>`;

  currentWeatherContainer.append(currentWeatherCard);
};

// CANNOT GET THIS TO RENDER
const RenderCurrentDayTimeCard = function (currentData) {
  const currentDayTimeCard = ` <h1 class="pl-3 title" id="currentDay">${currentData.date}</h1>
  <p class="pl-3 subtitle" id="currentTime">${currentData.time}</p>`;
  console.log(currentData.date);
  console.log(currentData.time);
  currentDayTimeContainer.append(currentDayTimeCard);
};

// construct current stats card
const renderCurrentStatsCard = function (currentData) {
  const currentStatsCard = `<h2 class="pt-4 pl-3 title">Daily Stats</h2>
    <div class="column">
    <div class="daily-stats">
    <div><i class="fas fa-sun fa-lg"></i> Sunrise </div>
    <div>${currentData.sunrise}am</div>
    </div>
    <div class="daily-stats">
    <div><i class="fas fa-moon"></i> sunset</div>
    <div>${currentData.sunset}pm</div>
    </div>
    <hr>
    <div class="daily-stats">
    <div><i class="fas fa-tint fa-lg"></i> Humidity</div>
    <div>${currentData.humidity}%</div>
    </div>
    <div class="daily-stats">
    <div><i class="fas fa-wind fa-lg"></i> Wind speed</div>
    <div>${currentData.wind}mph</div>
    </div>
    <div class="daily-stats">
    <div>UV levels</div>
    <span>${currentData.uvi}</span>
    </div>
</div>`;
  currentStatsContainer.append(currentStatsCard);
};

// construct weather forecast cards
const renderForecastWeatherCards = function (forecastData) {
  const constructForecastCard = function (each) {
    return `<div class="forecast-card-column">
        <p>${each.date}</p>
        <div>
            <img src="https://openweathermap.org/img/w/${each.iconCode}.png"/>
        </div>
        <p>${each.temperature}&deg</p>
        <p>${each.wind_speed}mph</p>
        <p>${each.humidity}%</p>
        </div>`;
  };

  const forecastCards = forecastData.map(constructForecastCard).join("");

  const forecastCardsContainer = `<div class="content">
    <div class="columns is-mobile" id="forecast-card-container">
    ${forecastCards}
    </div>
    </div>`;

  mainForecastCardContainer.append(forecastCardsContainer);
};

// current weather card
const renderWeatherCard = function (weatherData) {
  RenderCurrentDayTimeCard(weatherData.current);

  currentWeatherContainer.empty();
  renderCurrentWeatherCard(weatherData.current);

  currentStatsContainer.empty();
  renderCurrentStatsCard(weatherData.current);

  renderForecastWeatherCards(weatherData.forecast);
};

const handleSearch = async function (event) {
  event.preventDefault();

  const cityName = $("#cityInput").val();
  if (cityName) {
    const weatherData = await getWeatherData(cityName);

    mainForecastCardContainer.empty();

    renderWeatherCard(weatherData);

    // get city from LS
    const cities = JSON.parse(localStorage.getItem("searchedCities")) ?? [];
    console.log(cities);
    // insert cityName in cities
    if (!cities.includes(cityName)) {
      cities.push(cityName);
      // set cities in LS
      localStorage.setItem("searchedCities", JSON.stringify(cities));
    }
  }
};

$("#search-form").on("submit", handleSearch);
