import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);


export function sliderSection() {

  let mm = gsap.matchMedia()

  mm.add("(min-width: 768px)", () => {

    let slider = document.querySelector('.slider')
    let sliderSections = gsap.utils.toArray('.slide')

    let sliderTl = gsap.timeline({
      defaults: {
        ease: 'none'
      },
      scrollTrigger: {
        trigger: slider,
        pin: true,
        scrub: 1,
        end: () => "+=" + slider.offsetWidth
      }
    })

    sliderTl
      .to(slider, {
        xPercent: -66
      }, "<")
      .to('.progress', {
        width: '100%'
      }, "<")

    sliderSections.forEach((stop, index) => {
      const slideText = new SplitType(stop.querySelector('.slide-p'), { types: 'chars' });

      sliderTl.from(slideText.chars, {
        opacity: 0,
        y: 10,
        stagger: .03,
        scrollTrigger: {
          trigger: stop.querySelector('.slide-p'),
          start: 'top bottom',
          end:   'bottom center',
          containerAnimation: sliderTl,
          scrub: true,
        }
      })
    })

  })

}