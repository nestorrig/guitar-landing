import {
  animateWords,
  contactSection,
  modelSection,
  sliderSection,
} from "./animations";
import { initThreeJS } from "./three";
import { preloadFiles, setupSmoothScroll } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  preloadFiles([
    // "ring.glb",
    "images/guitar.gltf",
    "images/image1.webp",
    "images/image2.webp",
    "images/image3.webp",
    "images/les paul custom.webp",
    "images/les paul modern.webp",
    "images/les paul standard.webp",
    "les paul.mp4",
  ]);

  initThreeJS();
  // initRenderLoop()

  animateWords();
  modelSection();
  sliderSection();
  contactSection();

  setupSmoothScroll();
});
