const STEP_WALK			= 10;
const STEP_ROT 			= 5;
const CANVAS_HEIGHT 	= 720;
const CANVAS_WIDTH 		= 720;
const MAP_HEIGHT 		= 24;
const MAP_WIDTH 		= 24;
const SQUARE_SIZE 		= CANVAS_HEIGHT / MAP_HEIGHT;

const startPosition = {x:60, y:60};
const player = new Player(startPosition, 0);

document.addEventListener("keyup", (e) => {
	player.walk(STEP_WALK, e.key);
	player.rotation(STEP_ROT, e.key);
	renderScene();
});

const renderScene = function (){
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	canvas.height = CANVAS_HEIGHT;
	canvas.width = CANVAS_WIDTH;
	renderMap(SQUARE_SIZE);
	player.raycast();
	player.show();
}

window.addEventListener("load", () => {
	renderScene();
});
