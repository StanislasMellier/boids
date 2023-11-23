import { World } from './src/World/World';
import './style.css';

let world;
function main() {
	const container = document.querySelector('#scene-container');
	world = new World(container);
	world.start();
	const stepBtn = document.getElementById('step-btn');
	// stepBtn.addEventListener('click', () => {
	// 	world.step();
	// });
}
main();
//
//
//
/*
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');
const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);

const boxSize = 2;
const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);

*/
