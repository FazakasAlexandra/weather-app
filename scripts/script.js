import { Current } from "../classes/Current.js"
import { Details } from "../classes/Details.js"
import { Navigation } from "../classes/Navigation.js"

function getLocation() {
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
    let { latitude, longitude } = position.coords
    getWether(Math.round(latitude), Math.round(longitude))
}

getLocation()

function getWether(lat, lon) {
    let appid = '40548cc5b12a46ee9418e263dd707583'

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${appid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(response => response.json())
        .then((response) => {
            let controls = document.querySelector('.controls')
            let currentContainer = document.querySelector('#current')
            let detailsContainer = document.querySelector('.details')
            let currentWeather = getCurrentTemperature(response)
            let detailsWeather = getCurrentDetails(response)
            let weekDays = getWeekDays(response)
            let daily = getDailyWeather(response)
     
            let current = new Current(currentContainer, currentWeather)
            current.render()
            let navigation = new Navigation(controls, currentContainer, detailsContainer, weekDays, detailsWeather, currentWeather, daily )  
            navigation.createNavBar()  
            navigation.details.renderCurrent()     
        })
}

function getCurrentTemperature(response) {
    let { dt, temp } = response.current
    let { description, main } = response.current.weather[0]
    let { max, min } = response.daily[0].temp
    max = convertKelvin(Math.round(max))
    min = convertKelvin(Math.round(min))

    let cTemp = convertKelvin(Math.round(temp))
    let date = convertDate(dt)

    let currentWeather = {
        day: date.day,
        hour: date.hour,
        description,
        temp: cTemp,
        max,
        min,
        main
    }
    
    return currentWeather
}

function getCurrentDetails(response) {
    console.log(response)
    let { sunrise, sunset, wind_speed, uvi, clouds, humidity } = response.current
    sunrise = convertDate(sunrise)
    sunset = convertDate(sunset)

    let detailsWeather = {
        sunrise: sunrise.hour,
        sunset: sunset.hour,
        windSpeed: wind_speed,
        uvi,
        clouds,
        humidity
    }

    return detailsWeather
}

function getDailyWeather(response){
    let details = []
    let temperature = []
    let weekDays = getWeekDays(response)
    let daily = response.daily
    daily.shift();

    for (let i = 0; i < daily.length; i++){
        let { sunrise, sunset, wind_speed, uvi, clouds, humidity } = daily[i]

        let dayDetail = {
            id: weekDays[i],
            sunrise : convertDate(sunrise).hour,
            sunset : convertDate(sunset).hour,
            wind_speed,
            uvi,
            clouds,
            humidity
        }

        let { day, max, min } = response.daily[i].temp
        let { main, description } = response.daily[i].weather[0]

        let dayTemperature = {
            id: weekDays[i],
            date : convertDate(sunrise).day,
            dayTemp : convertKelvin(Math.round(day)),
            max : convertKelvin(Math.round(max)),
            min : convertKelvin(Math.round(min)),
            main,
            description
        }

        details.push(dayDetail)
        temperature.push(dayTemperature)
    }

    console.log({details, temperature})

    return {details, temperature} 
}