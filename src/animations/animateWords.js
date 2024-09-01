import gsap from 'gsap';
import SplitType from 'split-type';

export function animateWords() {

  const words = ["Romance", "Rings", "Relationships"]
  let currentIndex = 0
  let split
  const textElement = document.querySelector('.primary-h1 span')

  function updateText() {
    textElement.textContent = words[currentIndex]
    split = new SplitType(textElement, {type: 'chars' })
    animateChars(split.chars)
    currentIndex = (currentIndex + 1) % words.length
  }

  function animateChars(chars) {
    gsap.from(chars, {
      yPercent: 100,
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out',
      onComplete: () => {
        if (split) {
          split.revert()
        }
      }
    })
  }

  setInterval(updateText, 3000)

}