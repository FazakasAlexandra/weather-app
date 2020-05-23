class Details {
    constructor(controls, days, weather, daily) {
        this.controls = controls
        this.days = days
        this.details = [
            {
                name: 'Sunrise',
                detail: weather.sunrise,
                icon: "https://image.flaticon.com/icons/svg/1315/1315683.svg"
            },
            {
                name: 'Sunset',
                detail: weather.sunset,
                icon: "https://image.flaticon.com/icons/svg/1315/1315684.svg"
            },
            {
                name: 'Wind speed',
                detail: weather.windSpeed,
                icon: "https://image.flaticon.com/icons/svg/1315/1315688.svg"

            },
            {
                name: 'uvi',
                detail: weather.uvi,
                icon: "https://image.flaticon.com/icons/svg/1315/1315679.svg"
            },
            {
                name: 'Clouds',
                detail: weather.clouds,
                icon: "https://image.flaticon.com/icons/svg/1315/1315653.svg"
            },
            {
                name: 'Humidity',
                detail: weather.humidity,
                icon: "https://image.flaticon.com/icons/svg/1315/1315656.svg"

            }
        ]
        this.daily = daily
    }

    renderCurrentDetails(isCurrentChanged, currentObject) {
        if (isCurrentChanged) {
            this.rendercurrentDetails()
            this.changeCurrentBack(currentObject)

        } else {
            this.rendercurrentDetails()
        }
    }

    rendercurrentDetails() {
        let { details } = this

        for (let i = 0; i < details.length; i++) {
            let detail = this.createCurrentDetail(i, details[i].name, details[i].icon, details[i].detail)
            this.controls.appendChild(detail)
        }
    }

    createCurrentDetail(number, name, url, detail) {
        let detailContainer = document.createElement('div')
        detailContainer.setAttribute('id', `detail-${number}`)
        detailContainer.setAttribute('class', 'detail')

        let detailName = `<p>${name}</p>`
        let imageContainer = this.createImgContainer(url, detail)

        detailContainer.innerHTML = detailName + imageContainer

        return detailContainer
    }

    createImgContainer(url, detail) {
        let imageContainer = `<div class = 'details-images'>
                                <img src = "${url}">
                                <p>${detail}</p>
                              </div>`

        return imageContainer
    }

    renderDays() {
        let days = []

        for (let i = 0; i < this.days.length; i++) {
            let container = document.createElement('div')
            container.setAttribute('class', 'day')
            let day = this.createDay(this.days[i])
            container.appendChild(day)
            days.push(container)
        }

        this.controls.style.gridTemplateRows = '33.3% 33.3% 33.3%'
        this.controls.id = 'daily-clicked'
        days.forEach((day) => this.controls.appendChild(day))
    }

    createDay(date) {
        //let span = document.createElement('span')
        let p = document.createElement('p')
        p.innerText = date
        p.addEventListener('click', (event) => {
            this.dayEvent(event)
        })

        return p
    }

    dayEvent(event) {
        event.target.style.color = "rgb(105, 105, 105)"

        for (let i = 0; i < this.daily.details.length; i++) {
            if (this.daily.details[i].id === event.target.innerHTML) {
                this.markDay(event.target)
                this.changeCurrentByDay(i)
                this.createDayDetails(i)
            }
        }
    }

    markDay(day) {
        if (!document.getElementById('day-clicked')) {
            day.style.color = "rgb(105, 105, 105)"
            day.id = 'day-clicked'
        } else {
            let clickedDay = document.getElementById('day-clicked')
            clickedDay.style.color = 'rgb(168, 167, 167)'
            clickedDay.removeAttribute('id')
            day.style.color = "rgb(105, 105, 105)"
            day.id = "day-clicked"
        }
    }

    changeCurrentByDay(i) {
        let { icon, date, max, min, dayTemp, main, description } = this.daily.temperature[i]

        let month = document.querySelector('#month-day')
        month.innerHTML = date

        document.querySelector('#hour').style.display = 'none'

        this.changeCurrentContainer(icon, max, min, dayTemp, main, description)
    }

    changeCurrentBack(currentObject) {
        let { icon, day, description, hour, main, max, min, temp } = currentObject.weather
        let month = document.querySelector('#month-day')
        let currentHour = document.querySelector('#hour')
        currentHour.style.display = 'block'
        month.innerHTML = day
        currentHour.innerHTML = hour

        this.changeCurrentContainer(icon, max, min, temp, main, description)
    }

    changeCurrentContainer(icon, max, min, dayTemp, main, description) {
        document.querySelector('#max-temperature').innerHTML = `${max}°C`
        document.querySelector('#min-temperature').innerHTML = `${min}°C`
        document.querySelector('#day-temp').innerHTML = `${dayTemp}°C `
        document.querySelector('#main').innerHTML = main
        document.querySelector('#description').innerHTML = description
        document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    }

    createDayDetails(dayNumber) {
        //data that has to be rendered inside the day-detail-container(s)
        let dayDetailsContainers = []

        for (let i = 0; i < 6; i++) {
            let container = this.makeContainer(i, dayNumber)
            dayDetailsContainers.push(container)
        }

        let main = document.querySelector(".main-container")

        if (document.querySelector('#day-detail-clicked')) {
            document.querySelector('#day-detail-clicked').remove()
            this.renderDayDetail(main, dayDetailsContainers)

        } else {
            this.renderDayDetail(main, dayDetailsContainers)
        }

    }

    renderDayDetail(container, childrens) {
        let dayDetails = document.createElement('div')
        dayDetails.setAttribute('class', 'day-details')
        dayDetails.id = 'day-detail-clicked'
        let stringDOM = childrens.join(" ")
        dayDetails.innerHTML = stringDOM
        container.appendChild(dayDetails)
        container.style.gridTemplateColumns = '30% 50% 30%'
    }

    makeContainer(i, dayNumber) {
        let iconData = this.daily.details[dayNumber].icons[i]
        console.warn(icon)
        let data = this.changeData(iconData.name, dayNumber)

        let container = `<div class = "day-detail-container">
                           <p class = "day-detail-title">${iconData.name}</p>
                           <div class = "day-detail">
                             <img src = ${iconData.icon} class="day-detail-img">
                             <p class ="day-detail-data">${data}</p>
                           </div>
                         </div>`
        return container
    }

    changeData(iconName, dayNumber) {
        let { sunrise, sunset, clouds, uvi, humidity, wind_speed } = this.daily.details[dayNumber]
        let data = ""
        console.log(dayNumber)
        console.log(this.daily.details[dayNumber])

        switch (iconName) {
            case 'Sunrise':
                data = sunrise
                break;

            case 'Sunset':
                data = sunset
                break;

            case 'Clouds':
                data = clouds
                break;

            case 'uvi':
                data = uvi
                break;

            case 'Humidity':
                data = humidity
                break;

            case 'Wind Speed':
                data = wind_speed
                break;
        }

        return data;
    }
}

export { Details }
