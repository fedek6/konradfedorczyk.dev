import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  Timer,
  AmbientLight,
  DirectionalLight,
  Box3,
  Vector3,
  Mesh,
  NearestFilter,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * 3D rendering code for head model including mouse tracking
 * Some parts of this code could be refactored (now it is working, so I'm leaving it as it is).
 * Shader was written by GLB 5.2 model (thanks to Chinese engineers 谢谢！)
 */

/**
 * Configuration
 */
const CONFIG = {
  model: "/model_with_hat.glb",
  ps1Config: {
    resolutionScale: 0.25,
    vertexSnapping: 40,
  },
  breathStrength: 0.6,
  rotationXStrength: 0.05,
  rotationYStrength: 0.15,
};

/**
 * Globals
 */
let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let modelWrapper: Group;
let model: Group;
let container: HTMLElement | null;
const mouse = { x: 0, y: 0 };
const timer = new Timer();
timer.connect(document);
let totalElapsed = 0;
let breath = { value: 0 };
let animationEnabled = true;
let isMouse = false;

/**
 * Initialize the scene
 */
export function initScene() {
  container = document.querySelector<HTMLElement>("#head-3d");
  isMouse = !window.matchMedia("(hover: none)").matches;

  if (!container) {
    return;
  }

  animationEnabled = true;

  // Scene is always square
  const { offsetWidth: width } = container;
  const height = width;

  // Setup container
  container.style.height = `${height}px`;

  if (!renderer) {
    createRenderer(container);
  }

  // Resize canvas on window changes
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);

  container.querySelector("img")?.remove();
  container.appendChild(renderer.domElement);
  animate(0);
}

/**
 * Main animation loop
 * @param timestamp
 * @returns
 */
function animate(timestamp: number) {
  if (!animationEnabled || !renderer || !scene || !camera) {
    return;
  }

  requestAnimationFrame(animate);

  timer.update(timestamp);
  const delta = timer.getDelta();
  totalElapsed += delta;

  if (model) {
    if (isMouse) {
      const targetRotY = mouse.x * (Math.PI / 4);
      const targetRotX = mouse.y * (Math.PI / 4);
      modelWrapper.rotation.y += (targetRotY - modelWrapper.rotation.y) * 0.1;
      modelWrapper.rotation.x += (targetRotX - modelWrapper.rotation.x) * 0.1;

      // Reset scale if resizing from mobile to desktop
      modelWrapper.scale.set(1, 1, 1);
    } else {
      breath.value = 0.5 + CONFIG.breathStrength * Math.sin(totalElapsed * 2);
      modelWrapper.rotation.y = Math.sin(totalElapsed * 0.8) * CONFIG.rotationYStrength;
      modelWrapper.rotation.x = Math.sin(totalElapsed * 0.8) * CONFIG.rotationXStrength;
      const scale = 1 + breath.value * 0.025;
      modelWrapper.scale.set(scale, scale, scale);
    }
  }

  renderer.render(scene, camera);
}

/**
 * Fire once create renderer (& load model).
 * @param container
 */
function createRenderer(container: HTMLElement) {
  const { offsetWidth: width } = container;
  const height = width;

  // Create renderer and scene
  scene = new Scene();
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  renderer = new WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(1);
  renderer.setSize(
    width * CONFIG.ps1Config.resolutionScale,
    height * CONFIG.ps1Config.resolutionScale,
    false,
  );
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.imageRendering = "pixelated";
  renderer.setClearColor(0xffffff, 0);

  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xe3e4db, 3.0);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  camera.position.z = 5;

  modelWrapper = new Group();
  scene.add(modelWrapper);

  const loader = new GLTFLoader();
  loader.load(
    CONFIG.model,
    (gltf) => {
      model = gltf.scene;
      model.scale.set(2.4, 2.4, 2.4);
      model.rotation.y = -(Math.PI / 2);

      const box = new Box3().setFromObject(model);
      const center = box.getCenter(new Vector3());
      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;
      model.position.y += 0.3;

      model.traverse((node) => {
        if (node instanceof Mesh) {
          const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];
          materials.forEach((material) => {
            if (material.map) {
              material.map.minFilter = NearestFilter;
              material.map.magFilter = NearestFilter;
              material.map.needsUpdate = true;
            }
            material.onBeforeCompile = (shader: any) => {
              shader.vertexShader =
                "uniform float uTime;\n" + shader.vertexShader;
              shader.vertexShader = shader.vertexShader.replace(
                "#include <project_vertex>",
                `
                  #include <project_vertex>
                  vec4 snappedPosition = projectionMatrix * mvPosition;
                  snappedPosition.xyz = snappedPosition.xyz / snappedPosition.w;
                  snappedPosition.x = floor(snappedPosition.x * ${CONFIG.ps1Config.vertexSnapping}.0) / ${CONFIG.ps1Config.vertexSnapping}.0;
                  snappedPosition.y = floor(snappedPosition.y * ${CONFIG.ps1Config.vertexSnapping}.0) / ${CONFIG.ps1Config.vertexSnapping}.0;
                  snappedPosition.xyz *= snappedPosition.w;
                  gl_Position = snappedPosition;
                  `,
              );
            };
            material.needsUpdate = true;
          });
        }
      });

      modelWrapper.add(model);
    },
    (xhr) => {
      console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error("Error loading the GLB model:", error);
    },
  );
}

/**
 * Destroy the scene
 */
export function destroyScene() {
  animationEnabled = false;
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
  timer.reset();
}

//
// Handlers
//

/**
 * Handle resize window
 * @returns
 */
function handleResize() {
  if (!container) return;
  container.style.height = `auto`;
  const { offsetWidth: width } = container;
  container.style.height = `${width}px`;
  isMouse = !window.matchMedia("(hover: none)").matches;

  renderer.setSize(
    width * CONFIG.ps1Config.resolutionScale,
    width * CONFIG.ps1Config.resolutionScale,
    false,
  );
}

/**
 * Track mouse movement
 * @param event
 * @returns
 */
function handleMouseMove(event: MouseEvent) {
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let dx = (event.clientX - centerX) / (window.innerWidth / 2);
  let dy = (event.clientY - centerY) / (window.innerHeight / 2);
  mouse.x = Math.max(-1, Math.min(1, dx));
  mouse.y = Math.max(-1, Math.min(1, dy));
}
