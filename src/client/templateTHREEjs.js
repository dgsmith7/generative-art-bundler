/*//////////////////////////////////////////////////////////
"1ofX Simple ThreeJS template" 
Original code by David Gail Smith, February 2022
Twitter: @davidgailsmith
http://baconbitscollective.org
A simple JS starter template for THREE js projects on 1ofX
*/ //////////////////////////////////////////////////////////
"use strict";

import {
  Scene,
  Color,
  DirectionalLight,
  AmbientLight,
  SpotLight,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let container,
  scene,
  camera,
  renderer,
  ambLt,
  dirLt,
  spotLt,
  geometry0,
  geometry1,
  geometry2,
  material0,
  material1,
  material2,
  mesh0,
  mesh1,
  mesh2,
  controls;
let screenShotDone = false;

function init() {
  scene = new Scene();
  scene.background = new Color(
    baconRand.rand(),
    baconRand.rand(),
    baconRand.rand()
  );
  setCamera();
  setLights();
  buildRenderer();
  container = renderer.domElement;
  console.log(container);
  //  document.querySelector("#mural").appendChild(container);
  document.body.appendChild(container);
  buildIt();
  addOrbitControls();
  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  updateScene();
  renderer.render(scene, camera);
}

function updateScene() {
  if (screenShotDone == false) {
    // waits for first frame to take screenshot and send features
    //  add features on next line if desired
    //  window.OneOfX.save({Hubs: 6, Stages: 3, Gears: 26, Rods: 29, Color_Schemes: 12, Palettes: 130});
    screenShotDone = true;
  }
  // put any scene updates here (rotation of objects for example, etc)
  controls.update();
}

function setCamera() {
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 5; //25;
  camera.position.y = 3; //23;
  camera.position.z = 5; //25;
  scene.add(camera);
}

function setLights() {
  ambLt = new AmbientLight(0xffffff, 0.8);
  scene.add(ambLt);
  dirLt = new DirectionalLight(0xffffff, 0.8);
  dirLt.position.set(0, 15, 0);
  scene.add(dirLt);
  spotLt = new SpotLight(0xffffff, 0.8);
  spotLt.position.set(5, 1, 2);
  spotLt.decay = 2.0;
  scene.add(spotLt);
}

function buildRenderer() {
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight, true);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function buildIt() {
  //  put all of your geometry and materials in here

  geometry0 = new BoxGeometry(2, 2, 2);
  //    geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
  material0 = new MeshPhongMaterial({
    color: new Color(baconRand.rand(), baconRand.rand(), baconRand.rand()),
    side: DoubleSide,
  });
  mesh0 = new Mesh(geometry0, material0);
  scene.add(mesh0);

  // geometry0 = new BoxGeometry(10, 16.18, 0.1);
  // material0 = new MeshPhongMaterial({
  //   color: new Color(baconRand.rand(), baconRand.rand(), baconRand.rand()),
  //   side: DoubleSide,
  // });
  // material1 = new MeshPhongMaterial({
  //   color: new Color(baconRand.rand(), baconRand.rand(), baconRand.rand()),
  //   side: DoubleSide,
  // });
  // material2 = new MeshPhongMaterial({
  //   color: new Color(baconRand.rand(), baconRand.rand(), baconRand.rand()),
  //   side: DoubleSide,
  // });
  // mesh0 = new Mesh(geometry0, material0);
  // scene.add(mesh0);
  // geometry1 = new BoxGeometry(16.18, 0.1, 10);
  // mesh1 = new Mesh(geometry1, material1);
  // scene.add(mesh1);
  // geometry2 = new BoxGeometry(0.1, 10, 16.18);
  // mesh2 = new Mesh(geometry2, material2);
  // scene.add(mesh2);
  console.log(scene);
}

function addOrbitControls() {
  controls = new OrbitControls(camera, container);
  controls.minDistance = 5;
  controls.maxDistance = 50;
  controls.autoRotate = true;
}

init();
animate();
