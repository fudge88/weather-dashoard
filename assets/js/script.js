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

const renderCurrentWeatherCard = function (currentData) {
  console.log(currentData);
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

// current weather card
const renderWeatherCard = function (weatherData) {
  console.log(weatherData);
  renderCurrentWeatherCard(weatherData.current);
};

renderWeatherCard(mockData);
