import { Details } from "./Details.js"
import { Current } from "./Current.js"

class Navigation {
    constructor(controls, currentContainer, detailsContainer, detailsDays, detailsWeather, currentWeather) {
        this.controls = controls
        this.currentContainer = currentContainer
        this.detailsContainer = detailsContainer
        //console.log(this.detailsContainer)
        //console.log(detailsDays)
        //console.log(detailsWeather)
        this.details = new Details(this.detailsContainer, detailsDays, detailsWeather)
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
            console.log(spanText[i])
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
        console.log(li)
        console.log(li.firstChild)
        let span = li.firstChild

        switch (span.id) {
            case 'Current':
                if(this.details.controls.id === 'details-clicked') {
                    console.log('inside current')
                    this.details.controls.style.gridTemplateRows = '50% 50%'
                    this.details.controls.innerHTML = ""
                    this.details.renderCurrent()
                } else {
                    this.details.controls.id = 'details'
                    console.log(document.querySelector('#details'))
                    this.details.controls.innerHTML = ""
                    this.details.renderCurrent()
                }
            break

            case 'Daily':
                console.log('inside daily')
                this.details.controls.innerHTML = ""
                this.details.renderDaily()
            break

            case 'Hourly':
                console.log('inside hourly')
                this.details.controls.innerHTML = ""
                this.details.renderHourly()
            break
        }
    }

    markSection(li) {
        console.log(li)

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