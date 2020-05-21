class Details {
    constructor(controls, days, weather) {
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
    }

    renderCurrent() {
        let { details } = this
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
        let daysTagsArr = this.days.map((day) =>`<div class="daily"><div><p>${day}</p></div></div>`)
        let daysTagsStr = daysTagsArr.join(" ")
        console.log(this.controls)
        this.controls.style.gridTemplateRows = '33.3% 33.3% 33.3%'
        this.controls.id = 'details-clicked'
        this.controls.innerHTML = daysTagsStr
    }

    renderHourly(){
        console.log('Not done yet')
    }
}

export { Details }
