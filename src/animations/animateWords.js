import gsap from 'gsap';
import SplitType from 'split-type';

export function animateWords() {

  const words = ["Music", "Talent", "Art", "Passion", "Love", "Life"];
  let currentIndex = 0;
  let split;
  const textElement = document.querySelector(".primary-h1 span");

  function updateText() {
    textElement.textContent = words[currentIndex];
    split = new SplitType(textElement, { type: "chars" });
    animateChars(split.chars);
    currentIndex = (currentIndex + 1) % words.length;
  }

  function animateChars(chars) {
    const tl = gsap.timeline();

    tl.to(chars, {
      x: 0,
      y: 200,
      stagger: 0.03,
      duration: 1.5,
      ease: "power4.out",
    }).to(chars, {
      opacity: 0,
      delay: 0.5,
      duration: 0.8,
      stagger: 0.03,
      ease: "power4.out",
      onComplete: () => {
        if (split) {
          split.revert();
        }
        setTimeout(updateText, 100);
      },
    });
  }

  updateText();
}