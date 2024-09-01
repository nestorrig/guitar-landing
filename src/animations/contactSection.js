import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export function contactSection()  {

  gsap.set('h4, .inner-contact span', {
    yPercent: 100
  })
  gsap.set('.inner-contact p', { 
    opacity: 0
  })

  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.inner-contact',
      start: '-20% center',
      end: '10%  40%',
      scrub: true,
    }
  })

  contactTl
    .to('.line-top, .line-bottom', {
      width: '100%'
    })
    .to('h4, .inner-contact span', {
      yPercent: 0
    })
    .to('.inner-contact p', {
      opacity: 1
    })

}