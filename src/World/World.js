import { createCamera } from './components/camera';
import { createLights } from './components/lights';
import { createScene } from './components/scene';
import { Resizer } from './systems/Resizer';
import { createRenderer } from './systems/renderer';
import { Loop } from './systems/Loop';
import { createBoids } from './components/boids';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
class World {
	#camera;
	#controls;
	#scene;
	#renderer;
	#loop;
	constructor(container) {
		this.#camera = createCamera();
		this.#scene = createScene();
		this.#renderer = createRenderer();
		this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);

		this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);
		container.append(this.#renderer.domElement);

		const light = createLights();

		const boid = createBoids(500);

		this.#loop.updatables.push(boid);

		this.#scene.add(light, boid);

		const resizer = new Resizer(container, this.#camera, this.#renderer);
	}
	render() {
		this.#renderer.render(this.#scene, this.#camera);
	}
	start() {
		this.#loop.start();
	}
	stop() {
		this.#loop.stop();
	}
}
export { World };
