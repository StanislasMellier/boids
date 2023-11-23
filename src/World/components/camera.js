import { PerspectiveCamera } from 'three';

function createCamera() {
	const camera = new PerspectiveCamera(35, 1, 0.1, 1000);

	camera.position.set(300, 350, 300);
	camera.lookAt(0, 0, 0);

	return camera;
}

export { createCamera };
