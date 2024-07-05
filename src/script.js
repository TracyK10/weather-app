function displayWeather(response){
    let temperature = document.querySelector('#temperature')
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector('#time')
    let date = new Date(response.data.time * 1000)

    let iconElement = document.querySelector('#icon')
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" /> `;


    cityElement.innerHTML = response.data.city;
    temperature.innerHTML = Math.round(response.data.temperature.current);
    timeElement.innerHTML = formatDate(date)
    windElement.innerHTML = `${response.data.wind.speed}km / h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description 

    console.log(response.data);
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

let searchFormElement = document.querySelector('#search-form')
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Paris")