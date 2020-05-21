function removeSecounds(object){
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
        hour : date[4]
    }
    removeSecounds(dateObj)
    return dateObj
}

function removeDateChars(date){
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