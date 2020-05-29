function removeSecounds(object) {
    let splitHour = object.hour.split(':')
    splitHour.pop()
    object.hour = `${splitHour[0]}:${splitHour[1]}`
}

function convertKelvin(valNum) {
    let celsius = Math.round(valNum - 273.15)

    return celsius
}

function convertDate(epoch) {
    let date = new Date(epoch * 1000).toGMTString().split('GMT').splice(0, 1).toString()
    date = toObj(date)

    return date
}

function toObj(date) {
    date = removeDateChars(date)
    let day = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`

    let dateObj = {
        day,
        hour: date[4]
    }
    removeSecounds(dateObj)
    return dateObj
}

function removeDateChars(date) {
    let firstSplit = date.split(',')
    let joinedDate = firstSplit.join("")
    let secoundSplit = joinedDate.split(" ")
    date = secoundSplit.splice(0, 5)

    return date
}

function getWeekDays(response) {
    let weekDays = response.daily.map((day) => {
        let date = convertDate(day.dt)
        let [weekday, modate] = date.day.split(' ')

        return `${weekday} ${modate}`
    })
    //remove the current day
    weekDays.shift()
    return weekDays
}

function getTodayHourlyData(response) {
    // purpose: get the remained hours for today
    // get todays date and hourly dates: convert epoch into my obj
    let todayDate = convertDate(response.current.dt).day
    let hourlyDates = response.hourly.map((item) => convertDate(item.dt))

    let hours = []
    // check which elements of hourlyDates are equal to todays date
    // get the hour of the ones that are equal 
    hourlyDates.forEach(date => {
        if (date.day === todayDate)
            hours.push(date.hour)
    });

    // based on the number of remained hours, get the weather details of hourly data
    let hourlyWeathers = []
    for (let i = 0; i < hours.length; i++) {
        hourlyWeathers.push(response.hourly[i])
    }
    
    // add the hour and remove epoch
    hourlyWeathers = hourlyWeathers.map((hourlyWeather, i) => {
        hourlyWeather.hour = hours[i]
        delete hourlyWeather.dt
        return hourlyWeather
    })

    return  hourlyWeathers 
}