import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let guitar = null;
let contactRotation = false;
let renderer, scene, camera, controls;

const colorsButtons = document.querySelectorAll(".color");
// const toggleViewBtn = document.querySelector(".edit-mode");

export function initThreeJS() {
  // Debug
  const gui = new dat.GUI();
  dat.GUI.toggleHide();

  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  console.log({ canvas });
  

  // Scene
  scene = new THREE.Scene();

  // Middle stuff

  const materials = {};

  loader.load("guitar.gltf", function (gltf) {
    guitar = gltf.scene;
    scene.add(guitar);
    guitar.position.set(0, -0.15, 0);
    console.log(guitar);

    materials.cover = guitar.getObjectByName("Generic_Les_Paul_Mesh_4").material,

    materials.cover.color = new THREE.Color(0x800000);


    colorsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const color = button.dataset.color;
        materials.cover.color.set(color);
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "section.details",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      defaults: {
        ease: "power3.out",
        duration: 3,
      },
    });

    tl.to(guitar.position, {
      z: 3.5,
      y: -0.34,
    });
    tl.to(
      guitar.rotation,
      {
        z: 1,
      },
      "<"
    )


    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: "section.customize",
        start: "top bottom",
        end: "bottom top",
        // markers: true,
        scrub: true,
        onEnter: () => {
          contactRotation = true;
        },
        onLeaveBack: () => {
          gsap.to(materials.cover, {
            color: new THREE.Color(0x800000),
          });
        },
      },
    });
    contactTl.to(guitar.position, {
      z: 0,
      x: 0,
      y: -0.15,
    }).to(guitar.rotation, {
      z: 0,
    }," <");


    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.z = 8;
    scene.add(directionalLight);
  });
  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;
  scene.add(camera);

  // Controls
  controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false

  /**
   * Renderer
   */
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // toggleViewBtn.addEventListener("click", () => {
  //   canvas.style.pointerEvents = "none";
  //   toggleViewBtn.classList.remove("active");
  //   gsap.to(camera.position, {
  //     x: 0,
  //     y: 0,
  //     z: 1,
  //     duration: 1,
  //   });
    
  // });

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    if (guitar) {
      if (!contactRotation) {
        guitar.rotation.y = 0.5 * elapsedTime;

      } else {
        guitar.rotation.y = 0.1 * elapsedTime;
        guitar.rotation.x = 0
        guitar.rotation.z = 0
      }
    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}

export function initRenderLoop() {

}