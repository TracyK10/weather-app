function displayWeather(response){
    let temperature = document.querySelector('#temperature')
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector('#time')
    let date = new Date(response.data.time * 1000)

    let weatherDetails = response.data

    let iconElement = document.querySelector('#icon')
    iconElement.innerHTML = `<img src="${weatherDetails.condition.icon_url}" class="weather-app-icon" /> `;


    cityElement.innerHTML = weatherDetails.city;
    temperature.innerHTML = Math.round(weatherDetails.temperature.current);
    timeElement.innerHTML = formatDate(date)
    windElement.innerHTML = `${weatherDetails.wind.speed}km / h`;
    humidityElement.innerHTML = `${weatherDetails.temperature.humidity}%`;
    descriptionElement.innerHTML = weatherDetails.condition.description 

    console.log(response.data);
    getForecast(response.data.city);
}

function formatDate(date){
    let minutes = date.getMinutes()
    let hours = date.getHours()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    if(minutes < 10){
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes}`
}

function searchCity(city){
    let apiKey = "16t1b3fa04b8866116ccceb0d2do3a04";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather)
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector('#search-input');
    searchCity(searchInput.value)
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
    ];
    return days[date.getDay()]
}

function getForecast(city){
    let apiKey = "16t1b3fa04b8866116ccceb0d2do3a04";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response){
    let forecast = document.querySelector("#forecast")

    let forecastHtml = ""

    response.data.daily.forEach(function(day, index) {
        if (index < 5 ){
          forecastHtml =
            forecastHtml +
            `
        <div class="forecast-day">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <img src="${day.condition.icon_url}" class="forecast-icon" />
              <div class="forecast-temperature">
                <div class="forecast-temperatures"><strong>${Math.round(
                  day.temperature.maximum
                )}°</strong></div>
                <div class="forecast-temperatures">${Math.round(
                  day.temperature.minimum
                )}°</div>
                </div>
               </div>
        `;
        }
    })

    forecast.innerHTML = forecastHtml
}

let searchFormElement = document.querySelector('#search-form')
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Paris")


