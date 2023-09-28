const apiKey = "495fc713c8f3769e0c23bdb740307bbf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const city = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const errorMessage = document.querySelector(".error-message");
const weatherContainer = document.querySelector(".weather-container");

const cityWeatherImg = document.getElementById("city-weather-img");
const cityName = document.getElementById("city-name");
const cityHumidity = document.getElementById("city-humidity");
const cityTemp = document.getElementById("city-temp");
const cityWindSpeed = document.getElementById("city-wind-speed");

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status === 404) {
        errorMessage.innerHTML = "Please Enter a correct city";
        errorMessage.classList.add("text-danger");
        setTimeout(() => {
            errorMessage.innerHTML = "";

            errorMessage.style.display = "none";
            errorMessage.classList.remove("text-danger");
        }, 2000);
    } else {
        let data = await response.json();

        weatherContainer.style.display = "block";
        cityName.innerHTML = data.name;
        cityTemp.innerHTML = Math.round(data.main.temp) + "°C";
        cityWindSpeed.innerHTML =
            data.wind.speed + "km/h" + `<span>Wind Speed</span>`;
        cityHumidity.innerHTML =
            data.main.humidity + "%" + `<span>Humidity</span>`;
    }
}

searchBtn.addEventListener("click", (e) => {
    checkWeather(city.value);
});
