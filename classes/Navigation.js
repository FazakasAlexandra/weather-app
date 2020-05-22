import { Details } from "./Details.js"
import { Current } from "./Current.js"

class Navigation {
    constructor(controls, currentContainer, detailsContainer, detailsDays, detailsWeather, currentWeather, daily) {
        this.controls = controls
        this.currentContainer = currentContainer
        this.detailsContainer = detailsContainer
        this.details = new Details(this.detailsContainer, detailsDays, detailsWeather, daily)
        this.current = new Current(currentWeather)
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
        console.log(this.details)

        switch (span.id) {
            case 'Current':
                if(controls.id === 'daily-clicked' || document.querySelector('#day-clicked')) {
                // case daily section was clicked on and we click now back on current, go back to two rows
                // case current data was changed due to click on one day of daily
                    controls.style.gridTemplateRows = '50% 50%'
                    controls.innerHTML = ""
                    this.details.renderCurrent()
                } else {
                    controls.id = 'details'
                    controls.innerHTML = ""
                    this.details.renderCurrent()
                }
            break

            case 'Daily':
                controls.innerHTML = ""
                this.details.renderDaily()
            break

            case 'Hourly':
                controls.innerHTML = ""
                this.details.renderHourly()
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

}

export { Navigation }