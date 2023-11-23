import {
	BoxGeometry,
	BufferGeometry,
	ConeGeometry,
	Group,
	Line,
	LineBasicMaterial,
	MathUtils,
	Mesh,
	MeshStandardMaterial,
	Vector3,
} from 'three';
function createBoids(nbBoids = 10) {
	const boids = new Group();

	boids.BOX_SIZE = 150;
	boids.RANDOM_START_VELOCITY = boids.BOX_SIZE / 10;
	boids.VISION_RANGE = 30;
	boids.PROTECTED_RANGE = 5;
	boids.AVOID_FACTOR = 0.5;
	boids.MATCHING_FACTOR = 0.05;
	boids.CENTERING_FACTOR = 0.005;

	const geometry = new ConeGeometry(1, 3, 5);
	const material = new MeshStandardMaterial({ color: 'green' });
	geometry.rotateX(MathUtils.degToRad(90));
	for (let i = 0; i < nbBoids; i++) {
		const boid = new Mesh(geometry, material);

		boid.position.x = MathUtils.randInt(-boids.BOX_SIZE, boids.BOX_SIZE);
		boid.position.y = MathUtils.randInt(-boids.BOX_SIZE, boids.BOX_SIZE);
		boid.position.z = MathUtils.randInt(-boids.BOX_SIZE, boids.BOX_SIZE);
		boid.velocity = new Vector3(
			MathUtils.randInt(boids.RANDOM_START_VELOCITY, -boids.RANDOM_START_VELOCITY),
			MathUtils.randInt(boids.RANDOM_START_VELOCITY, -boids.RANDOM_START_VELOCITY),
			MathUtils.randInt(boids.RANDOM_START_VELOCITY, -boids.RANDOM_START_VELOCITY)
		);

		boids.add(boid);
	}

	boids.tick = (delta) => {
		boids.children.forEach((boid) => {
			detectEdge(boid, boids.BOX_SIZE);

			separationRule(boids, boid);
			AlignmentRule(boids, boid);
			CohesionRule(boids, boid);

			boid.velocity.clampScalar(-(boids.BOX_SIZE / 5), boids.BOX_SIZE / 5);
			boid.lookAt(boid.position.clone().add(boid.velocity));
			boid.position.add(boid.velocity.clone().multiplyScalar(delta));
		});
	};
	return boids;
}
function detectEdge(boid, BOX_SIZE) {
	if (boid.position.x > BOX_SIZE) {
		boid.position.x = -BOX_SIZE;
	} else if (boid.position.x < -BOX_SIZE) {
		boid.position.x = BOX_SIZE;
	}
	if (boid.position.y > BOX_SIZE) {
		boid.position.y = -BOX_SIZE;
	} else if (boid.position.y < -BOX_SIZE) {
		boid.position.y = BOX_SIZE;
	}
	if (boid.position.z > BOX_SIZE) {
		boid.position.z = -BOX_SIZE;
	} else if (boid.position.z < -BOX_SIZE) {
		boid.position.z = BOX_SIZE;
	}
}
function separationRule(boids, boid) {
	for (const other of boids.children) {
		let d = boid.position.clone().sub(other.position);
		if (other != boid && d.length() < boids.PROTECTED_RANGE) {
			d.multiplyScalar(boids.AVOID_FACTOR);
			boid.velocity.add(d);
		}
	}
}
function AlignmentRule(boids, boid) {
	let vavg = new Vector3();
	let nb_other = 0;
	for (const other of boids.children) {
		let d = boid.position.clone().sub(other.position);
		if (other != boid && d.length() < boids.VISION_RANGE) {
			vavg.add(other.velocity);
			nb_other++;
		}
	}
	if (nb_other > 0) {
		vavg.divideScalar(nb_other);
		vavg.sub(boid.velocity);
		vavg.multiplyScalar(boids.MATCHING_FACTOR);
		boid.velocity.add(vavg);
	}
}
function CohesionRule(boids, boid) {
	let posavg = new Vector3();
	let nb_other = 0;
	for (const other of boids.children) {
		let d = boid.position.clone().sub(other.position);
		if (other != boid && d.length() < boids.VISION_RANGE) {
			posavg.add(other.position);
			nb_other++;
		}
	}
	if (nb_other > 0) {
		posavg.divideScalar(nb_other);
		posavg.sub(boid.position);
		posavg.multiplyScalar(boids.CENTERING_FACTOR);
		boid.velocity.add(posavg);
	}
}

export { createBoids };
