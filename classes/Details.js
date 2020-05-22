class Details {
    constructor(controls, days, weather, daily) {
        this.controls = controls
        this.days = days
        this.details = [
            {
                name: 'Sunrise',
                detail: weather.sunrise,
                icon:"https://image.flaticon.com/icons/svg/2294/2294952.svg"
            },
            {
                name: 'Sunset',
                detail: weather.sunset,
                icon: "https://image.flaticon.com/icons/svg/2294/2294957.svg"
            },
            {
                name: 'Wind speed',
                detail: weather.windSpeed,
                icon:"https://image.flaticon.com/icons/png/512/2676/2676047.png"

            },
            {
                name: 'Uvi',
                detail: weather.uvi,
                icon:"https://image.flaticon.com/icons/svg/2938/2938075.svg"
            },
            {
                name: 'Clouds',
                detail: weather.clouds,
                icon: "https://image.flaticon.com/icons/svg/2675/2675848.svg"
            },
            {
                name: 'Humidity',
                detail: weather.humidity,
                icon: "https://image.flaticon.com/icons/svg/1345/1345465.svg"

            }
        ]
        this.daily = daily
    }

    renderCurrent() {
        let { details } = this
        console.log('rendering current')
        if(!document.querySelector('#day-clicked'))
        for (let i = 0; i < details.length; i++) {
            let detail = this.createCurrent(i, details[i].name, details[i].icon, details[i].detail)
            this.controls.appendChild(detail)
        }
    }

    createCurrent(number, name, url, detail) {
        let detailContainer = document.createElement('div')
        detailContainer.setAttribute('id',`detail-${number}`)
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

    renderDaily() {
        let days = []

        for(let i = 0; i<this.days.length; i++){
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

    createDay(date){
        //let span = document.createElement('span')
        let p = document.createElement('p')
        p.innerText = date
        p.addEventListener('click', (event)=>{
            this.dayEvent(event)
        })

        return p
    }

    dayEvent(event){
        event.target.style.color = "rgb(105, 105, 105)"

        for( let i = 0; i < this.daily.details.length; i++){
            if(this.daily.details[i].id === event.target.innerHTML){
                this.markDay(event.target)
                this.changeCurrent(i)
                //getDayDetails()
            }
        }
    }
    
    markDay(day){
        if(!document.getElementById('day-clicked')) {
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

    changeCurrent(i){
        let {date, max, min, dayTemp, main, description} = this.daily.temperature[i]
        console.log(dayTemp)

        let month = document.querySelector('#month-day')
        month.innerHTML = date

        let hour = document.querySelector('#hour')? document.querySelector('#hour').remove() : 'no hour'
        document.querySelector('#max-temperature').innerHTML = `${max}°C`
        document.querySelector('#min-temperature').innerHTML = `${min}°C`
        document.querySelector('#day-temp').innerHTML = `${dayTemp}°C `
        document.querySelector('#main').innerHTML = main
        document.querySelector('#description').innerHTML = description
    }

    //getDayDetails()

    renderHourly(){
    }
}

export { Details }
