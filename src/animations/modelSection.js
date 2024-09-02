import gsap from 'gsap'
import { Flip } from 'gsap/Flip'


gsap.registerPlugin(Flip)

export function modelSection() {



const cardContainer = document.querySelector('.cards')
const cards = document.querySelector('.card')
const sortBtn = document.querySelector('.toggle-view')
const btnLabel = document.querySelector('.button-words')
const sortIcon = document.querySelector('button svg')

let sortRows = false

sortBtn.addEventListener('click', () => {
    const state = Flip.getState(".cards, .card, .card-details, img",{props: 'background'})

    cardContainer.classList.toggle('rows')

    Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut'
    })

    if (!sortRows) {
       gsap.to(btnLabel, {
            y: -30,
        })
        sortRows = true
    } else {
        gsap.to(btnLabel, {
            y: 0,
        })
        sortRows = false
    }
})
}