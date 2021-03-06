import { Details } from "./Details.js"
import { Current } from "./Current.js"

class Navigation {
    constructor(controls, currentContainer, detailsContainer, detailsDays, detailsWeather, currentWeather, daily, hourly ) {
        this.controls = controls
        this.currentContainer = currentContainer
        this.detailsContainer = detailsContainer

        this.details = new Details(
            this.detailsContainer, 
            detailsDays, 
            detailsWeather, 
            daily,
            hourly
        )

        this.current = new Current(currentWeather, null)
    }

    createNavBar() {
        let nav = document.createElement('nav')
        let ul = document.createElement('ul')
        let lis = this.createLis(3)
        lis.forEach((li) => {
            li.addEventListener('click', () => {
                this.changeSection(li)
                this.markSection(li)
            })
            ul.appendChild(li)
        })
        nav.prepend(ul)

        this.controls.prepend(nav)
    }

    createLis(ListItemsNr) {
        let spanText = ['Current', 'Daily', 'Hourly']
        let lis = []

        for (let i = 0; i < ListItemsNr; i++) {
            lis[i] = this.createLi(spanText[i], i)
        }

        return lis
    }

    createLi(spanText, i){
        let li = document.createElement('li')
        let span = document.createElement('span')

        if (i === 0) {
            li.setAttribute('id', 'clicked')
            span.id = spanText
            span.innerText = spanText
            li.appendChild(span)
        } else {
            span.id = spanText
            span.innerText = spanText
            li.appendChild(span)
        }
        
        return li
    }


    changeSection(li) {
        let span = li.firstChild
        let { controls } = this.details
        let isCurrentChanged = document.querySelector('#day-detail-clicked') || document.querySelector('#hour-details-clicked')? true : false

        switch (span.id) {
            case 'Current':
                this.checkPreviousSection(isCurrentChanged, controls)
                this.removeDayDetail()
                this.removeHourDetail()
            break

            case 'Daily':
                controls.innerHTML = ""
                this.details.renderDays()
                this.removeHourDetail()
            break

            case 'Hourly':
                controls.innerHTML = ""
                this.removeDayDetail()
                controls.id = 'hourly-clicked'
                
                this.details.changeCurrentBack(this.current)
                this.details.renderHours()
            break
        }
    }

    markSection(li) {
        if (!document.getElementById('clicked')) {
            li.style.boxShadow = '1px 1px 3px 1px #98b8c29d'
            li.setAttribute('id', `clicked`)

        } else {
            let clicked = document.getElementById('clicked')
            clicked.style.boxShadow = 'none'
            clicked.removeAttribute('id')
            li.style.borderRadius = '30px';
            li.style.boxShadow = '1px 1px 3px 1px #98b8c29d'
            li.setAttribute('id', 'clicked')
        }
    }

    removeDayDetail(){
        if(document.querySelector('.day-details')){
            document.querySelector('.day-details').remove()
            this.details.fixView()
        }
    }

    removeHourDetail(){
        if(document.querySelector('.hour-details')){
            document.querySelector('.hour-details').remove()
            this.details.fixView()
        }
    }

    checkPreviousSection(isCurrentChanged, controls){
        if(controls.id === 'daily-clicked' || controls.id === 'hourly-clicked') {
            // case daily section was clicked on and we click now back on current, go back to two rows
            // case current data was changed due to click on one day of daily or one hour of hourly
                controls.style.gridTemplateRows = '50% 50%'
                document.querySelector('.main-container').style.gridTemplateColumns = '50% 50%'
                controls.innerHTML = ""
                this.details.renderCurrentDetails(isCurrentChanged, this.current) 
            } else {
                controls.id = 'details'
                controls.innerHTML = ""
                this.details.renderCurrentDetails()
            }
    }

}

export { Navigation }