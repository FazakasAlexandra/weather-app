class Current{
    constructor(weather, currentContainer){
        this.weather = weather
        this.currentContainer = currentContainer
    }

    render(){
        let dateSection = this.createDateSection()
        let tempSection = this.createTempSection()
        let weatherSection = this.createWeatherSection()
        let maxTempSection = this.createMaxTempSection()
        this.currentContainer.appendChild(dateSection)
        this.currentContainer.appendChild(tempSection)
        this.currentContainer.appendChild(weatherSection)
        this.currentContainer.appendChild(maxTempSection)
    }

    createDateSection(){
        let container = document.createElement('div') 
        container.setAttribute('id', 'date')
        let dateSection = `<p id = "month-day">${this.weather.day} </p>
                           <p id = "hour">${this.weather.hour} </p>`
        container.innerHTML = dateSection
        return container
    }

    createTempSection(){
        let container = document.createElement('div')
        container.setAttribute('id', 'temp')
        let imgClass = 'id = "icon"'
        let tempSection = `<p id = "day-temp">${this.weather.temp}°C </p>
                           <img src="http://openweathermap.org/img/wn/${this.weather.icon}@2x.png"${imgClass}>`
        container.innerHTML = tempSection

        return container

    }

    createWeatherSection() {
        let container = document.createElement('div')
        container.setAttribute('id', 'weather')
        let weatherSection = `<p id = "main">${this.weather.main}</p>
                              <p id = "description">${this.weather.description}</p>`
        container.innerHTML = weatherSection
        
        return container
    }

    createMaxTempSection() {
        let container = document.createElement('div')
        container.setAttribute('id', 'maxTemp')
        let maxTempSection = `<div class = "max-min">
                                <p id = "max-text"> Max </p>
                                <p id = "min-text"> Min </p>
                              </div>
                              <div class = "max-min">
                                <div class = "max-min-arrows">
                                   <i class ="fas fa-arrow-up"></i>
                                   <p id ="max-temperature">${this.weather.max}°C </p>
                                </div>
                                <div class = "max-min-arrows">
                                   <i class ="fas fa-arrow-down"></i>
                                   <p id = "min-temperature"> ${this.weather.min}°C </p>
                                </div>
                              </div>`
                              
        container.innerHTML = maxTempSection

        return container
    }
}

export { Current }