import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger);
const loader = new GLTFLoader()
let ring = null
let contactRotation = false
let renderer,scene,camera

export function initThreeJS() {

  // Debug
  const gui = new dat.GUI()
  dat.GUI.toggleHide()

  // Canvas
  const canvas = document.querySelector('canvas.webgl')

  // Scene
  scene = new THREE.Scene()

  // Middle stuff

  loader.load('ring.glb', function(gltf) {

    ring = gltf.scene
    ring.position.set(0,0,0)
    ring.scale.set(0.5,0.5,0.5)
    scene.add(ring)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'section.details',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      defaults: {
        ease: 'power3.out',
        duration: 3
    }
    })

    tl.to(ring.position, {
      z: 3.5,
      y: -0.34
    })
    tl.to(ring.rotation, {
      z: 1,
    }, "<")


    // Function to toggle wireframe
    function toggleWireframe(model, isWireframe, opacity) {
      model.traverse(function(child) {
        if (child.isMesh && child.material) {
          child.material.wireframe = isWireframe;
          child.material.opacity = opacity;
          child.material.transparent = true;
        }
      });
    }

    const contactTl = gsap.timeline({ 
      scrollTrigger: {
        trigger: 'section.contact',
        start: 'top 80%',
        end: 'bottom center',
        //toggleActions: 'play none none reverse',
        scrub: true,
        onEnter: () => {
          toggleWireframe(ring, true, 1)
          contactRotation = true
        },
        onEnterBack: () => {
          toggleWireframe(ring, true, 1)
          contactRotation = true
        },
        onLeaveBack: () => {
          toggleWireframe(ring, false, 1)
          //contactRotation = false
        }, 
        onLeave: () => {
          toggleWireframe(ring, false, 1)
          //contactRotation = false
        }, 

      }
    })

    contactTl.to(ring.position, {
      z: .3,
      x: .4,
      y: -.23
    })



    const directionalLight = new THREE.DirectionalLight('lightblue',10)
    directionalLight.position.z = 8
    scene.add(directionalLight)



})
    /**
   * Sizes
   */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
  }

    
  window.addEventListener('resize', () =>
  {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
  
      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
  
      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  
  /**
   * Camera
   */
  // Base camera
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 2
  scene.add(camera)

    /**
   * Renderer
   */
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


  const clock = new THREE.Clock()
  
  const tick = () =>
  {
  
      const elapsedTime = clock.getElapsedTime()
  
      // Update objects
      if (ring) {
        if (!contactRotation) {
          ring.rotation.y = .5 * elapsedTime
          ring.rotation.x = 0
          ring.rotation.z = 0
        }
        else {
          ring.rotation.y = 0
          ring.rotation.x = .2 * elapsedTime
          ring.rotation.z = .2 * elapsedTime
        }
      }
  
      // Update Orbital Controls
      // controls.update()
  
      // Render
      renderer.render(scene, camera)
  
      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
  }
  
  tick()
}

export function initRenderLoop() {

}