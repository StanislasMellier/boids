import { World } from './src/World/World';
import './style.css';

let world;
function main() {
	const container = document.querySelector('#scene-container');
	world = new World(container);
	world.start();
}
main();
