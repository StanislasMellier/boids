import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
	const geometry = new BoxGeometry(2, 2, 2);
	const material = new MeshStandardMaterial({ color: 'lightgrey' });
	const cube = new Mesh(geometry, material);

	cube.tick = (delta) => {
		cube.rotation.y += 0.2 * delta;
	};
	return cube;
}

export { createCube };
