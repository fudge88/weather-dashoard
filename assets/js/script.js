const mockData = {
  current: {
    name: "London",
    temperature: 123.45,
    wind: 111.22,
    humidity: 33,
    uvi: 2.5,
    date: "(3/30/2021)",
    iconCode: "04n",
  },
  forecast: [
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
  ],
};

const currentWeatherContainer = $("#current-weather-container");

// construct current weather card
const renderCurrentWeatherCard = function (currentData) {
  const currentWeatherCard = `<h1 class="pl-3 title-city">${currentData.name}</h1>
    <div class="column temp-icon-wrapper">
        <div class="ml-4 current-temp-container">
        <p class="temp-display">${currentData.temperature}&deg</p>
        <p class="subtitle">Feels like 12*C</p>
        </div>
        <div class="ml-4 current-weather-icon-container">
        <img src="https://openweathermap.org/img/w/${currentData.iconCode}.png" class="mb-4 current-icon"/>
        <p class="subtitle">Partly Cloudy</p>
        </div>
    </div>`;

  currentWeatherContainer.append(currentWeatherCard);
};

const currentStatsContainer = $("#current-stats-container");

// construct current stats card
const renderCurrentStatsCard = function (currentData) {
  const currentStatsCard = `<h2 class="pt-4 pl-3 title">Daily Stats</h2>
    <div class="column">
        <div class="daily-stats">
        <div><i class="fas fa-tint fa-lg"></i> Humidity</div>
        <div>${currentData.humidity}%</div>
        </div>
        <div class="daily-stats">
        <div><i class="fas fa-wind fa-lg"></i> Wind speed</div>
        <div>${currentData.wind}mph</div>
        </div>
        <div class="daily-stats">
        <div><i class="fas fa-sun fa-lg"></i> UV levels</div>
        <div>${currentData.uvi}</div>
        </div>
    </div>`;

  currentStatsContainer.append(currentStatsCard);
};

const mainForecastCardContainer = $("#weather-forecast-card-container");

// construct weather forecast cards
const renderForecastWeatherCards = function (forecastData) {
  const constructForecastCard = function (each) {
    return `<div class="forecast-card-column">
        <p>${each.date}</p>
        <div>
            <img src="https://openweathermap.org/img/w/${each.iconCode}.png"/>
        </div>
        <p>Cloudy & Rain</p>
        <p>${each.temperature}</p>
        </div>`;
  };

  const forecastCards = forecastData.map(constructForecastCard).join("");

  const forecastCardsContainer = `<div class="content">
    <div class="columns is-mobile" id="forecast-card-container">
    </div>
    ${forecastCards}
    </div>`;

  mainForecastCardContainer.append(forecastCardsContainer);
};

// current weather card
const renderWeatherCard = function (weatherData) {
  renderCurrentWeatherCard(weatherData.current);
  renderCurrentStatsCard(weatherData.current);
  renderForecastWeatherCards(weatherData.forecast);
};

renderWeatherCard(mockData);
