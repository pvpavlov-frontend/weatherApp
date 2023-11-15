const SEARCH_BUTTON = document.querySelector("#search-button");
const SEARCH_CITY_INPUT = document.querySelector("#city-input");

const LOADING_TEXT = document.querySelector("#load");
const WEATHER_INFO_CONTAINER = document.querySelector("#weather-info-container");
const WEATHER_ERROR_CONTAINER = document.querySelector("#weather-error-container");

const WEATHER_CITY = document.querySelector("#weather-city");
const WEATHER_ICON = document.querySelector("#weather-icon");

const INFO_TEMP = document.querySelector(".info__temp");
const ERROR_TITLE = document.querySelector(".error__title");
const ERROR_DESC = document.querySelector(".error__desc");

const APP_ID = "eea75aae6dbe00233ac1efadf2d99a2a";

const createWeaterCard = (weatherData) => {
    INFO_TEMP.textContent = (weatherData.main.temp - 273.15).toFixed() + "º";
    WEATHER_CITY.textContent = weatherData.name;
    WEATHER_ICON.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    LOADING_TEXT.style.display = "none";
    WEATHER_ERROR_CONTAINER.style.display = "none";
    WEATHER_INFO_CONTAINER.style.display = "flex";
};
const createErrorCard = (weatherError) => {
    ERROR_TITLE.textContent = weatherError.cod;
    ERROR_DESC.textContent = weatherError.message;

    LOADING_TEXT.style.display = "none";
    WEATHER_INFO_CONTAINER.style.display = "none";
    WEATHER_ERROR_CONTAINER.style.display = "flex";

};

async function searchWeatherForCity() {
    const CITY_NAME = SEARCH_CITY_INPUT.value.trim();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${APP_ID}`;

    if (CITY_NAME.length === 0) {
        return alert("Please enter a city name");
    }
    WEATHER_INFO_CONTAINER.style.display = "none";
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log('result=>', result)
        if (!response.ok) {
            throw Object.assign(new Error("API Error"), {
                response: result,
            });
        } else {
            createWeaterCard(result);
        }
    } catch (error) {
        LOADING_TEXT.style.display = "none";
        WEATHER_ERROR_CONTAINER.style.display = " flex";
        createErrorCard(error.response);
    }
}
SEARCH_BUTTON.addEventListener("click", searchWeatherForCity);