function displayWeather(response){
    let temperature = document.querySelector('#temperature')
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = response.data.city
    temperature.innerHTML = Math.round(response.data.temperature.current);
    console.log(response.data);
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