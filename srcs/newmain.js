const STEP_WALK			= 10;
const STEP_ROT 			= 5;
const CANVAS_HEIGHT 	= 480;
const CANVAS_WIDTH 		= 480;
const MAP_HEIGHT 		= 24;
const MAP_WIDTH 		= 24;
const VISION			= 60;
const RAY_DISTANCE		= VISION / 1000;
const NUMBER_RAYS		= VISION / RAY_DISTANCE;
const SQUARE_SIZE 		= CANVAS_HEIGHT / MAP_HEIGHT;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const frame = new Frame(ctx, 900, 900);
const player = new Player({x:60, y:60}, 0);


document.addEventListener("keyup", (e) => {
	player.walk(STEP_WALK, e.key);
	player.rotation(STEP_ROT, e.key);
});

let loop;
let i = 0;
let fps = 60;

const update = function (){
	player.raycast();
}

const render = function (){
	player.render(frame);
}

window.addEventListener("load", () => {
	loop = setInterval(() => {
		update();
		render();
	}, 1000 / fps);
});
