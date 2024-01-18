import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import glowVertexShader from './vertex.glsl'
import glowFragmentShader from './fragment.glsl'
import { DirectionalLight, Vector3 } from 'three'
import gsap from 'gsap'


home.addEventListener('click', () => {
    // Redirect to the desired website when button 1 is clicked
    window.location.href = 'https://www.cameo.com/kids';
});

aboutme.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/business';
});

projects.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/about';
});
contact.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/enroll';
});

toggleActors.addEventListener('click', () => {
    // Redirect to the desired website when button 1 is clicked
    window.location.href = 'https://www.cameo.com/browse/actors';
});

toggleComedians.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/browse/comedians';
});

toggleMusicians.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/browse/musicians';
});
toggleAthletes.addEventListener('click', () => {
    // Redirect to the desired website when button 2 is clicked
    window.location.href = 'https://www.cameo.com/browse/athletes';
});

/**
 * Spector JS
 */
// const SPECTOR = require('spectorjs')
// const spector = new SPECTOR.Spector()
// spector.displayUI()

/**
 * Base
 */
//Debug
// const gui = new dat.GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Overlay
 */

 window.addEventListener("load", function() {
    var loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    setTimeout(function() {
      loadingScreen.style.display = "none";
    }, 2000);
  });


/**
 * Loaders
 */

// Load Manager
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        gsap.to()
    },

    // Progress
    () =>
    {
        console.log('progress')
    }
)


// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)




/**
 * Models
 */
let stadium;
let clapBoard;
let microphone;
let guitar;



let rotationAngle = 0;
let rotationAngleStadium = 0;


gltfLoader.load('basic_movie_clap_board/scene.gltf', (gltf) => {
    gltf.scene.scale.set(.3, .3, .3);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.x = -.3;
    // gui.add(gltf.scene.position, 'x').min(-3).max(3).step(0.001).name('basic_movie_clap_board x')
    // gui.add(gltf.scene.position, 'y').min(-3).max(3).step(0.001).name('basic_movie_clap_board y')
    // gui.add(gltf.scene.position, 'z').min(-3).max(3).step(0.001).name('basic_movie_clap_board z')
    clapBoard = gltf.scene; // Assign the loaded scene to the stadium variable
    toggleClapBoardVisibility();
    scene.add(gltf.scene);
});

gltfLoader.load('/stadium.gltf', (gltf) => {
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.position.set(0, 0, 0);
    stadium = gltf.scene; // Assign the loaded scene to the stadium variable
    toggleStadiumVisibility();
    scene.add(gltf.scene);
});
gltfLoader.load('/vintage_microphone/scene.gltf', (gltf) => {
    gltf.scene.scale.set(0.6, 0.6, 0.6);
    gltf.scene.position.set(0, -1, 0);
    microphone = gltf.scene; // Assign the loaded scene to the stadium variable
    toggleMicrophoneVisibility();
    scene.add(gltf.scene);
});

gltfLoader.load('/electric_guitar/scene.gltf', (gltf) => {
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.z = 2;
    gltf.scene.rotation.x = -.2;



    guitar = gltf.scene; // Assign the loaded scene to the stadium variable
    toggleGuitarVisibility();
    scene.add(gltf.scene);
});


        // gui.add(gltf.scene.position, 'x').min(-3).max(3).step(0.001).name('stadium x')
        // gui.add(gltf.scene.position, 'y').min(-3).max(3).step(0.001).name('stadium y')
        // gui.add(gltf.scene.position, 'z').min(-3).max(3).step(0.001).name('stadium z')
        // gui.add(gltf.scene.rotation, 'x').min(-7).max(7).step(0.001).name('stadium rotation x')
        // gui.add(gltf.scene.rotation, 'y').min(-7).max(7).step(0.001).name('stadium rotation y')
        // gui.add(gltf.scene.rotation, 'z').min(-7).max(7).step(0.001).name('stadium rotation z')

 

const stadiumLight = new THREE.PointLight(0xffffff, 2); // White light with intensity 1
stadiumLight.position.set(0, 5, 0); // Adjust the position as needed
scene.add(stadiumLight);

const clapLight = new THREE.PointLight(0xffffff, 2); // White light with intensity 1
clapLight.position.set(0, -5, 0); // Adjust the position as needed
scene.add(clapLight);

function toggleStadiumVisibility() {
    if (stadium) {
        stadium.visible = !stadium.visible;
    }
}
function toggleClapBoardVisibility() {
    if (clapBoard) {
        clapBoard.visible = !clapBoard.visible;
    }
}

function toggleMicrophoneVisibility() {
    if (microphone) {
        microphone.visible = !microphone.visible;
    }
}

function toggleGuitarVisibility() {
    if (guitar) {
        guitar.visible = !guitar.visible;
    }
}

function updateStadiumRotation() {
    if (stadium) {
        // Rotate the stadium around the Y-axis
        stadium.rotation.y = rotationAngleStadium;
        rotationAngleStadium += 0.005; // Adjust the rotation speed as needed
    }
}
function updateClapBoardRotation() {
    if (clapBoard) {
        // Rotate the stadium around the Y-axis
        clapBoard.rotation.y = rotationAngle;
        rotationAngle += 0.005; // Adjust the rotation speed as needed
    }
}

function updateMicrophoneRotation() {
    if (microphone) {
        // Rotate the stadium around the Y-axis
        microphone.rotation.y = rotationAngle;
        rotationAngle += 0.005; // Adjust the rotation speed as needed
    }
}

function updateGuitarRotation() {
    if (guitar) {
        // Rotate the stadium around the Y-axis
        guitar.rotation.y = rotationAngle;
        rotationAngle += 0.005; // Adjust the rotation speed as needed
    }
}

document.getElementById("toggleAthletes").addEventListener("mouseover", toggleStadiumVisibility);
document.getElementById("toggleAthletes").addEventListener("mouseout", toggleStadiumVisibility);

document.getElementById("toggleActors").addEventListener("mouseover", toggleClapBoardVisibility);
document.getElementById("toggleActors").addEventListener("mouseout", toggleClapBoardVisibility);

document.getElementById("toggleComedians").addEventListener("mouseover", toggleMicrophoneVisibility);
document.getElementById("toggleComedians").addEventListener("mouseout", toggleMicrophoneVisibility);

document.getElementById("toggleMusicians").addEventListener("mouseover", toggleGuitarVisibility);
document.getElementById("toggleMusicians").addEventListener("mouseout", toggleGuitarVisibility);

// gltfLoader.load(
//     '/jukebox/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(1, 1, 1)
//         gltf.scene.position.set(0, 0, 0)
//         gltf.scene.rotation.y = 2

//         scene.add(gltf.scene)
//         // gui.add(gltf.scene.position, 'x').min(-3).max(3).step(0.001).name('jukebox x')
//         // gui.add(gltf.scene.position, 'y').min(-3).max(3).step(0.001).name('jukebox y')
//         // gui.add(gltf.scene.position, 'z').min(-3).max(3).step(0.001).name('jukebox z')
//         // gui.add(gltf.scene.rotation, 'x').min(-7).max(7).step(0.001).name('jukebox rotation x')
//         // gui.add(gltf.scene.rotation, 'y').min(-7).max(7).step(0.001).name('jukebox rotation y')
//         // gui.add(gltf.scene.rotation, 'z').min(-7).max(7).step(0.001).name('jukebox rotation z')

//     }
// )


scene.background = new THREE.Color(0x000000); // Replace 0xabcdef with your desired color in hexadecimal

// Adding blue light
const blueLight = new THREE.SpotLight(0x0000ff, 1000); // Blue light
blueLight.position.set(0, 10, 0); // Above the origin
blueLight.target.position.set(0, 0, 0); // Point towards the origin
scene.add(blueLight);
scene.add(blueLight.target);

let discoLights = []
function createSpotlight(color, position) {
    const spotlight = new THREE.SpotLight(color, 2000);
    spotlight.position.copy(position);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);
    discoLights.push(spotlight)
  }
  
  // Create spotlights with varying colors and positions
createSpotlight(0xFFDAB9, new THREE.Vector3(5, 10, 0)); 
createSpotlight(0xE6E6FA, new THREE.Vector3(-5, 10, 0)); 
createSpotlight(0x00FFFF, new THREE.Vector3(0, 10, 5)); 
createSpotlight(0xB625BE, new THREE.Vector3(-8, 0, 0)); 
createSpotlight(0xff96d0, new THREE.Vector3(8, 0, 0));  
createSpotlight(0xFF6347, new THREE.Vector3(-2.3, -8, 0)); 
createSpotlight(0x8a2be2, new THREE.Vector3(8, 0, 0));  
createSpotlight(0xFFDAB9, new THREE.Vector3(5, 10, 0)); 
createSpotlight(0xcc00ff, new THREE.Vector3(0, 5, 5)); 
createSpotlight(0xFFA500, new THREE.Vector3(-8, 0, 0)); 
createSpotlight(0xFF6347, new THREE.Vector3(-2.3, -8, 0)); 
createSpotlight(0xFF00D6, new THREE.Vector3(8, 0, 0));  
createSpotlight(0xcc00ff, new THREE.Vector3(-2.2, 1, -8));  
createSpotlight(0x0079ff, new THREE.Vector3(-1, .5, 4.5)); 
createSpotlight(0xFFDAB9, new THREE.Vector3(5.1, 10.8, 0.3)); 
createSpotlight(0xcc00ff, new THREE.Vector3(-0.5, 5.2, 5.9)); 
createSpotlight(0xFFA500, new THREE.Vector3(-7.2, 0.6, 0.8)); 
createSpotlight(0xFF6347, new THREE.Vector3(-1.9, -8.4, 0.7)); 
createSpotlight(0xFF00D6, new THREE.Vector3(8.5, 0.2, 0.4));  
createSpotlight(0xcc00ff, new THREE.Vector3(-1.2, 1.7, -7.8));  
createSpotlight(0x0079ff, new THREE.Vector3(-1.6, 0.3, 4.2));  
function turnOffDiscoLights() {
    discoLights.forEach((spotlight) => {
        spotlight.visible = false;
    });
}
function turnOnDiscoLights() {
    discoLights.forEach((spotlight) => {
        spotlight.visible = true;
    });
}
document.getElementById('toggleActors').addEventListener('mouseover', turnOffDiscoLights);
document.getElementById('toggleComedians').addEventListener('mouseover', turnOffDiscoLights);
document.getElementById('toggleMusicians').addEventListener('mouseover', turnOffDiscoLights);
document.getElementById('toggleAthletes').addEventListener('mouseover', turnOffDiscoLights);

document.getElementById('toggleActors').addEventListener('mouseout', turnOnDiscoLights);
document.getElementById('toggleComedians').addEventListener('mouseout', turnOnDiscoLights);
document.getElementById('toggleMusicians').addEventListener('mouseout', turnOnDiscoLights);
document.getElementById('toggleAthletes').addEventListener('mouseout', turnOnDiscoLights);

// Adding purple light
const purpleLight = new THREE.SpotLight(0xff00ff); // Purple light
purpleLight.position.set(0, 10, 0); // Above the origin
purpleLight.target.position.set(0, 0, 0); // Point towards the origin
scene.add(purpleLight);
scene.add(purpleLight.target);

// Adding purple light
const whiteLight = new THREE.PointLight(0xffffff); // white light
purpleLight.position.set(0, 0, 0); // at the origin

scene.add(whiteLight);

// Discoball
const sphereMaterial = new THREE.MeshStandardMaterial({
    transmission: 0.9,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
    thickness: 4,
    opacity: 1,
    clearcoat: 0,
    // metalness: 1,
    transparent: true,
    shading: THREE.FlatShading,
  });

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 30, 10),
    sphereMaterial
  );

  scene.add(sphere);


/**
 * Lights
 */

const pointLight2 = new THREE.PointLight(0xff96d0, 4.125)
pointLight2.position.set(2.702, 5, 5.101)
scene.add(pointLight2)

// gui.add(pointLight2.position, 'x').min(-8).max(8).step(0.001).name('x')
// gui.add(pointLight2.position, 'y').min(-8).max(8).step(0.001).name('y')
// gui.add(pointLight2.position, 'z').min(-8).max(8).step(0.001).name('z')






/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.92
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.5
    sizes.height = window.innerHeight * 0.92

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * mouse
 */
const mouse = new THREE.Vector2()

const touchHandler = function(e)
{
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        let touch = e.changedTouches[0] || e.touches[0]
        mouse.x = touch.pageX / sizes.width * 2 - 1
        mouse.y = -(touch.pageY / sizes.height) * 2 + 1
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        mouse.x = e.clientX / sizes.width * 2 - 1
        mouse.y = -(e.clientY / sizes.height) * 2 + 1
    }
}

// mouse.x = event.clientX / sizes.width * 2 - 1
// mouse.y = -(event.clientY / sizes.height) * 2 + 1
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3.761
camera.position.y = 3.363
camera.position.z = 5.805
scene.add(camera)
// gui.add(camera.position, 'x').min(-20).max(20).step(0.001).name('camera position x')
// gui.add(camera.position, 'y').min(-20).max(20).step(0.001).name('camera position y')
// gui.add(camera.position, 'z').min(-20).max(20).step(0.001).name('camera position z')




// Camera Controls
const controls = new OrbitControls(camera, canvas)
controls.target = new THREE.Vector3(0, 0, 0)
controls.enablePan = false
controls.enableDamping = true
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI * 0.5  
// controls.minAzimuthAngle = -Math.PI - 0.2
// controls.maxAzimuthAngle = -Math.PI * 0.5 +  0.2
controls.minDistance = 0
// controls.maxDistance = 8.8
controls.maxDistance = 100




/**
 *  *****INTERACTION CONTROLS PT1*****
 */ 
var raycaster = new THREE.Raycaster()



// gui.add(controls, 'minDistance').min(-20).max(20).step(0.001).name('minDistance')
// gui.add(controls, 'maxDistance').min(-20).max(20).step(0.001).name('maxDistance')

function returnCameraToOrigin() 
{
    controls.target = new THREE.Vector3(0, 1, 0)
    gsap.to(camera.position,
        {
            x: -7.761,
            y: 6.363,
            z: -8.805,
            duration: 1
        })
        controls.minPolarAngle = 0
        controls.maxPolarAngle = Math.PI * 0.5
        // controls.minAzimuthAngle = -Math.PI - 0.2
        // controls.maxAzimuthAngle = -Math.PI * 0.5 + 0.2
        controls.minDistance = 4.5
        controls.maxDistance = 13.8
}

function cameraToMonitor()
{
    controls.target = new THREE.Vector3(-1.18, 2.41, 2.028)
    gsap.to(camera.position,
        {
            x: -1.068,
            y: 3.105,
            z: -0.285,
            duration: 1,
            
        })
        controls.minPolarAngle = Math.PI * 0.5 -.2
        controls.maxPolarAngle = Math.PI * 0.5 -.2
        controls.maxAzimuthAngle = -Math.PI
        controls.minAzimuthAngle = -Math.PI
        controls.minDistance = 3.6
        controls.maxDistance = 7.8
}



window.addEventListener('keypress', (event) =>
{
    returnCameraToOrigin() 
})

window.addEventListener('keydown', (event) =>
{
    if (event.key == 'Escape')
    {
        returnCameraToOrigin() 
    }
})

window.addEventListener('contextmenu', (event) =>
{
    event.preventDefault()
    returnCameraToOrigin() 
    return false
})

window.addEventListener('mousedown', (event) =>
{
    // if (holobool && !controls.target.equals(new THREE.Vector3(-1.06, 1.12, -1.6)))
    // {
    //     console.log()
    //     cameraToHologram2()
    // }
    // if (monitorbool)
    // {
    //     console.log('clicked monitor')
    //     cameraToMonitor2()
    // }
    // if (phonebool && !controls.target.equals(new THREE.Vector3(1.321, 0.843, -2.224)))
    // {
    //     console.log('clicked phone')
    //     cameraToPhone()
    // }
    
}, false)

window.addEventListener('touchstart', (event) =>
{
    // if (holobool && !controls.target.equals(new THREE.Vector3(-1.06, 1.12, -1.6)))
    // {
    //     cameraToHologram()
    //     console.log('clicked hologram')
    // }
    // if (monitorbool)
    // {
    //     console.log('clicked monitor')
    //     cameraToMonitor()
        
    // }
    // if (phonebool && !controls.target.equals(new THREE.Vector3(1.321, 0.843, -2.224)))
    // {
    //     console.log('clicked phone')
    //     cameraToPhone()
    // }
    
}, false)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()

const buttons = document.querySelectorAll('.toggle-button');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    // Set the opacity to 0 for transparency
    sphere.material.opacity = 1;
    // Optionally, add a smooth transition
    gsap.to(sphere.material, { duration: 0.5, opacity: 0 });
  });

  button.addEventListener('mouseout', () => {
    // Reset the opacity to 1
    sphere.material.opacity = 1;
    // Optionally, add a smooth transition
    gsap.to(sphere.material, { duration: 0.5, opacity: 1 });
  });
});


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    /**
     *  *****INTERACTION CONTROLS PT2*****
    */ 
    raycaster.setFromCamera(mouse, camera)
 
    
    sphere.rotation.y += 0.005;
    updateStadiumRotation();
    updateClapBoardRotation();
    updateMicrophoneRotation();
    updateGuitarRotation();




    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


}

tick()