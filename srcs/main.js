const STEP_WALK			= 10;
const STEP_ROT 			= 5;
const CANVAS_HEIGHT 	= 480;
const CANVAS_WIDTH 		= 480;
const MAP_HEIGHT 		= 24;
const MAP_WIDTH 		= 24;
const VISION			= 44;
const RAY_DISTANCE		= 0.25;
const NUMBER_RAYS		= VISION / RAY_DISTANCE;
const SQUARE_SIZE 		= CANVAS_HEIGHT / MAP_HEIGHT;

const startPosition = {x:60, y:60};
const player = new Player(startPosition, 0);

document.addEventListener("keyup", (e) => {
	player.walk(STEP_WALK, e.key);
	player.rotation(STEP_ROT, e.key);
	renderScene();
	renderScene3D();
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



const C_HEIGHT		= 400;
const C_WIDTH		= 600;
const MAX_DISTANCE	= 400;


const drawWall2 = function(x, y, size, color) {
	const canvas = document.querySelector("#canvas1");
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(x, y, C_WIDTH / NUMBER_RAYS, size);
}

const drawWall3D = function() {

	/*for (const ray of player.rays)
	console.log(ray.distance);
	*/
	let x = 0; //(C_WIDTH / NUMBER_RAYS);
	let y;
	let lineSize;
	let color;

	for (const [i, ray] of player.rays.entries()) {
	
		if (ray.side == 1)
			color = "red";
		if (ray.side == -1)
			color = "blue";
		if (ray.side == 2)
			color = "green";
		if (ray.side == -2)
			color = "yellow";
		

		/*if (ray.side == 1 || ray.side == -1)
			color = "blue";
		if (ray.side == 2 || ray.side == -2)
			color = "green";
		*/
		
		//console.log(i, ray.distance);
		//lineSize = Math.abs(200- MAX_DISTANCE);
		//lineSize = Math.abs(ray.distToCamDir - MAX_DISTANCE);
		lineSize = Math.abs(MAX_DISTANCE / ray.distToCamDir);

		//lineSize = Math.abs(ray.distance - MAX_DISTANCE);
		y = (C_HEIGHT / 2) - (lineSize / 2)
		drawWall2(x, y, lineSize, color);
		x += (C_WIDTH / NUMBER_RAYS);
		//console.log(x);

	}
}


const renderScene3D = function (){
	const canvas = document.querySelector("#canvas1");
	const ctx = canvas.getContext("2d");
	canvas.height = C_HEIGHT;
	canvas.width = C_WIDTH;
	drawWall3D();
}

window.addEventListener("load", () => {
	renderScene();
	renderScene3D();
	console.log("number of rays: ", NUMBER_RAYS);
});
