class Details {
    constructor(controls, days, weather, daily, hourly) {
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
        this.hourly = hourly
        console.log('hourly: ', hourly)
        console.log('controls: ', controls)
    }

    renderCurrentDetails(isCurrentChanged, currentObject) {
        if (isCurrentChanged) {
            this.renderDetails()
            this.changeCurrentBack(currentObject)
        } else {
            this.renderDetails()
        }
    }

    renderDetails() {
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
            document.querySelector('.main-container').style.paddingRight = '8%'
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

        this.changeCurrentContainer('day', icon, max, min, dayTemp, main, description)
    }

    changeCurrentBack(currentObject) {
        let { icon, day, description, hour, main, max, min, temp } = currentObject.weather
        let month = document.querySelector('#month-day')
        let currentHour = document.querySelector('#hour')
        currentHour.style.display = 'block'
        month.innerHTML = day
        currentHour.innerHTML = hour

        this.changeCurrentContainer(null, icon, max, min, temp, main, description)
    }

    changeCurrentContainer(type, icon, max, min, dayTemp, main, description) {
        if (type === 'hour') {
            this.changeCurrentForHour(dayTemp, main, description, icon)
        } else {
            this.changeCurrentForDay(icon, max, min, dayTemp, main, description)
        }
    }

    changeCurrentForHour(dayTemp, main, description, icon){
        document.querySelector('#day-temp').innerHTML = `${dayTemp}°C `
        document.querySelector('#main').innerHTML = main
        document.querySelector('#description').innerHTML = description
        document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    }

    changeCurrentForDay(icon, max, min, dayTemp, main, description){
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

        console.log(dayNumber)

        for (let i = 0; i < 6; i++) {
            let container = this.createDayDetail(i, dayNumber)
            dayDetailsContainers.push(container)
        }

        let main = document.querySelector(".main-container")

        if (document.querySelector('#day-detail-clicked')) {
            document.querySelector('#day-detail-clicked').remove()
            this.renderDayDetail(main, dayDetailsContainers)

        } else if (document.querySelector('#hour-details-clicked')) {
            document.querySelector('#hour-details-clicked').remove()
            this.renderDayDetail(main, dayDetailsContainers)
        } else {
            this.renderDayDetail(main, dayDetailsContainers)
        }

    }

    createDayDetail(i, dayNumber){
        let iconData = this.daily.details[dayNumber].icons[i]
        let container = this.createDetailContainer('day', iconData, dayNumber)
        return container
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

    renderHours() {
        console.log(this.controls)
        this.fixView()
        let hours = []

        for (let i = 0; i < this.hourly.temperature.length; i++) {
            // only 9 grid cells available for only 9 hours
            // at the 9th grid cell , add arrow for next section
            if (i === 8) {
                // problem with last one
                let container = document.createElement('div')
                container.setAttribute('class', 'arrow')
                let arrow = this.createArrow(i)
                container.appendChild(arrow)
                hours.push(container)

            } else if (i > 8) {
                break

            } else {
                let container = document.createElement('div')
                container.setAttribute('class', 'hour')
                let hour = this.createHour(this.hourly.temperature[i])
                container.appendChild(hour)
                hours.push(container)
            }
        }
        this.controls.style.gridTemplateRows = '33.3% 33.3% 33.3%'
        this.controls.id = 'hourly-clicked'
        hours.forEach((hour) => this.controls.appendChild(hour))

    }

    createArrow(i) {
        let img = document.createElement('img')
        img.setAttribute('class', 'arrow')
        img.setAttribute('src', 'https://image.flaticon.com/icons/png/512/875/875564.png')
        img.addEventListener('click', () => console.log(i))
        return img
    }

    createHour(hour) {
        console.log(hour)
        let p = document.createElement('p')
        p.innerText = hour.id
        p.addEventListener('click', (event) => {
            // adjust view for hourly detail section
            document.querySelector('.main-container').style.paddingRight = '8%'
            this.hourEvent(event)
        })

        return p
    }


    hourEvent(event) {
        for (let i = 0; i < this.hourly.details.length; i++) {
            if (this.hourly.details[i].id === event.target.innerHTML) {
                this.markHour(event.target)
                this.changeCurrentByHour(i)
                this.createHourDetails(i)
                //this.check(this.hourly.details[i].id)
            }
        }
    }

    markHour(p) {
        console.log(p)
        if (document.querySelector('#hour-clicked')) {
            document.querySelector('#hour-clicked').style.color = 'rgb(168, 167, 167)'
            document.querySelector('#hour-clicked').removeAttribute('id')
            p.style.color = "rgb(105, 105, 105)"
            p.id = 'hour-clicked'

        } else {
            p.style.color = "rgb(105, 105, 105)"
            p.id = 'hour-clicked'
        }
    }

    changeCurrentByHour(i) {
        let { icon, main, description, hourTemp, hour } = this.hourly.temperature[i]
        document.querySelector('#hour').innerHTML = hour

        this.changeCurrentContainer('hour', icon, null, null, hourTemp, main, description)
    }

    createHourDetails(hourNumber, i) {
        console.log(this.hourly.details[i])
        let hourDetailsContainers = []

        for (let i = 0; i < 3; i++) {
            // 3 details to render -> 3 containers, each contains one detail
            let container = this.createHourDetail(i, hourNumber)
            hourDetailsContainers.push(container)
        }

        let main = document.querySelector(".main-container")
        if (document.querySelector('#hour-details-clicked')) {
            document.querySelector('#hour-details-clicked').remove()
            this.renderHourDetails(main, hourDetailsContainers)
        } else {
            this.renderHourDetails(main, hourDetailsContainers)
        }


    }

    createHourDetail(i, hourNumber) {
        let iconData = this.hourly.details[hourNumber].icons[i]
        let container = this.createDetailContainer('hour', iconData, hourNumber)
        return container
    }

    createDetailContainer(detailType, iconData, number) {
        //use it for daily details too
        let data = this.changeData(iconData.name, number)

        let container = `<div class = "${detailType}-detail-container">
                           <p class = "${detailType}-detail-title">${iconData.name}</p>
                           <div class = "${detailType}-detail">
                             <img src = ${iconData.icon} class = "${detailType}-detail-img">
                             <p class = "${detailType}-detail-data">${data}</p>
                           </div>
                         </div>`
        return container
    }

    renderHourDetails(container, childrens) {
        // use it for daily details too
        let hourDetails = document.createElement('div')
        hourDetails.setAttribute('class', 'hour-details')
        hourDetails.id = 'hour-details-clicked'
        let stringDOM = childrens.join(" ")
        hourDetails.innerHTML = stringDOM
        container.appendChild(hourDetails)
        container.style.gridTemplateColumns = '35% 50% 25%'

    }

    fixView() {
        let main = document.querySelector('.main-container')
        main.style.paddingRight = '0px'
        main.style.gridTemplateColumns = '50% 50%'
    }
}

export { Details }
