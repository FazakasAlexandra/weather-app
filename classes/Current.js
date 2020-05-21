class Current{
    constructor(currentContainer, weather){
        this.currentContainer = currentContainer
        console.log(currentContainer)
        this.weather = weather
    }

    render(){
        let dateSection = this.createDateSection()
        console.log(dateSection)
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
        container.setAttribute('class', 'date')
        let dateSection = `<p>${this.weather.day} </p>
                           <p>${this.weather.hour} </p>`
        container.innerHTML = dateSection
        return container
    }

    createTempSection(){
        let container = document.createElement('div')
        container.setAttribute('class', 'temp')
        let imgClass = 'class = "icon"'
        let tempSection = `<p>${this.weather.temp}°C </p>
                           <img src="https://image.flaticon.com/icons/svg/2938/2938075.svg"${imgClass}>`
        container.innerHTML = tempSection

        return container

    }

    createWeatherSection() {
        let container = document.createElement('div')
        container.setAttribute('class', 'weather')
        let weatherSection = `<p>${this.weather.main}</p>
                              <p>${this.weather.description}</p>`
        container.innerHTML = weatherSection
        
        return container
    }

    createMaxTempSection() {
        let container = document.createElement('div')
        container.setAttribute('class', 'maxTemp')
        let maxTempSection = `<div class = "max-min">
                                <p>Max</p>
                                <p>Min</p>
                              </div>
                              <div class = "max-min">
                                <div class = "max-min-arrows"><i class="fas fa-arrow-up"></i><p>${this.weather.max}</p></div>
                                <div class = "max-min-arrows"><i class="fas fa-arrow-down"></i><p>${this.weather.min}</p></div>
                              </div>`
        container.innerHTML = maxTempSection

        return container
    }
}

export { Current }