import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export function inspectionSection() {
  const inspectionTl = gsap.timeline({ 
    scrollTrigger: {
      trigger: '.inspection',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  inspectionTl
    .to('.inspection h2', {
      y: -100
    })
    .to('.ring-bg', {
      y: -50,
      height: 300
    }, "<")

  gsap.to('.marquee h3', {

    scrollTrigger: {
      trigger: '.marquee h3',
      start: 'top 80%',
      end: 'bottom top',
      scrub: true
    },
    x: 200
  })


}