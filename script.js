const API_KEY = 'a3d7131fa6904d3d81e24557242405'; //api key of weather
const url = "http://api.weatherapi.com/v1/current.json?key=" //endpoint

//adding a window event listener wherever browser reload it call  the fetchWeather function
// that will fetch the weather   from endpoint

window.addEventListener('load',fetchWeather('India'))

//add event listener to logo, so that when user will click on logo website will be reloaded
const logo = document.getElementById('title-logo')
logo.addEventListener('click',()=>{
  window.location.reload()
})

// function to get weather details from API

function fetchWeather(location){
  let result;

  fetch(`${url}${API_KEY}&q=${location}&aqi=no`)
  .then(async (res)=>{
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    result = await res.json();
    console.log(result)
    bindData(result)
  })
  .catch((ex)=>{
    console.log(ex)
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `<h1>Oops,${ex.error.message} for '${localStorage.getItem('searchValue')}'</h1>`

  })
}

// function to bind the data, this function will clone the template then fill the HTML with
// weather details , then append the clone template into weather-container

function bindData(data){
    const weatherContainer = document.getElementById('weather-container');
    const template = document.getElementById('template');

    weatherContainer.innerHTML ="";

    const cloneTemplate = template.content.cloneNode(true)
    fillInTheContainer(cloneTemplate,data)
    weatherContainer.appendChild(cloneTemplate)
}

// functin to fill the html element dynamically with weather details

function fillInTheContainer(container,data){
    const timeDiv = container.querySelector('.time')
    const icon = container.getElementById('icon')
    const tempInCelciusMainDiv = container.getElementById('tempInCelciusMainDiv')
    const realFeelTemp = container.getElementById('realFeelTemp')
    const condition = container.getElementById('condition')
    const tempInCelciusSideDiv = container.getElementById('tempInCelciusSideDive')
    const tempInF = container.getElementById('tempInF')
    const humidity = container.getElementById('humidity')

    const location = container.getElementById('location')
    const region = container.getElementById('region')
    const country = container.getElementById('country')
    const longitude = container.getElementById('longitude')
    const lattitude = container.getElementById('lattitude')
    const timeZone = container.getElementById('timeZone')

    const windVelocity = container.getElementById('windVelocity')
    const windVelocityInMiles = container.getElementById('windVelocityM/H')
    const windDirection = container.getElementById('windDirection')
    const windDirectionInDeg = container.getElementById('windDirectionInDeg')
    const windGust = container.getElementById('windGust')
    const windGustInMiles = container.getElementById('windGustM/H')
    const cloud = container.getElementById('cloud')

  try{
    timeDiv.innerHTML = data.location.localtime
    icon.src = data.current.condition.icon
    tempInCelciusMainDiv.innerHTML = data.current.temp_c
    realFeelTemp.innerHTML = data.current.feelslike_c
    condition.innerHTML = data.current.condition.text
    tempInCelciusSideDiv.innerHTML = data.current.temp_c
    tempInF.innerHTML = data.current.temp_f
    humidity.innerHTML = data.current.humidity

    location.innerHTML = data.location.name
    region.innerHTML = data.location.region
    country.innerHTML = data.location.country
    longitude.innerHTML = data.location.lon
    lattitude.innerHTML = data.location.lat
    timeZone.innerHTML = data.location.tz_id

    windVelocity.innerHTML = data.current.wind_kph
    windVelocityInMiles.innerHTML = data.current.wind_mph
    windDirection.innerHTML = data.current.wind_dir
    windDirectionInDeg.innerHTML = data.current.wind_degree
    windGust.innerHTML = data.current.gust_kph
    windGustInMiles.innerHTML = data.current.gust_mph
    cloud.innerHTML = data.current.cloud

  }catch(ex){
    console.log(ex)
  }
}

// function to get the weather details by getting input from user

function searchWeather(){
  const searchedValue = document.getElementById('searchInput')
  
    fetchWeather(searchedValue.value)
    localStorage.setItem('searchValue',searchedValue.value)
    searchedValue.value = "";
}

// function to get the  weather details by selecting a location from dropdown menu

function fetchWeatherOfSelectOptions(){
  const selectedOption = document.getElementById('locations')
  const value = selectedOption.options[selectedOption.selectedIndex].value;
  fetchWeather(value)
}