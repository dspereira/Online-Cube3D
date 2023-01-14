

// 24x24
/*
const map = [  
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
*/
const RADIUS		= 20;
const ANGLE_STEP	= 10;

/*const MAP_HEIGHT	= 1200;
const MAP_WIDTH		= 1200;
*/

const MAP_ROWS		= 24;
const MAP_COLUMNS	= 24;

// usage example: getPosMap({x:100, y:100});
// return obj = {i: 10, j: 5}
/*
const getMapPos = function(x, y) {
	const mapStep = MAP_WIDTH / MAP_COLUMNS;

	return {
		i: Math.floor(y / mapStep),
		j: Math.floor(x / mapStep)
	}
}

const getMapPosRaw = function(x, y) {
	const mapStep = MAP_WIDTH / MAP_COLUMNS;

	return {
		i: y / mapStep,
		j: x / mapStep
	}
}

const getCanvasPos = function(i, j) {
	const mapStep = MAP_WIDTH / MAP_COLUMNS;

	return {
		x: j * mapStep,
		y: i * mapStep
	}
}
*/

const getIntersectPoint = function(side, startPos, slop, mapPos) {

	// y = mx+b
	// x = (y-b)/m
	// b = y-mx

	const m = slop;
	const b = startPos.y - (m * startPos.x);
	/*console.log("startPos.y:", startPos.y);
	console.log("m:", m);
	console.log("b:", b);*/
	let finalX;
	let finalY;

	let canvasPos = getCanvasPos(mapPos.i, mapPos.j);

	if (side == 1)
	{
		finalX = canvasPos.x;
		finalY = (m * finalX) + b;
	}
	else if (side == 2)
	{
		finalY = canvasPos.y;
		finalX = (finalY - b) / m;
	}
	else if (side == -2)
	{
		finalY = canvasPos.y + 50;
		finalX = (finalY - b) / m;
	}
	else if (side == -1)
	{
		finalX = canvasPos.x + 50;
		finalY = (m * finalX) + b;
	}

	//console.log("finalX:", finalX);
	//console.log("finalX:", finalY);
	return {
		x: finalX,
		y: finalY
	};
}

// usage example: drawLine({x:100, y:100}, {x:200, y:100});
/*const drawLine = function (startPoint, endPoint)
{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#FF8A80";
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(endPoint.x, endPoint.y);
	ctx.stroke();
}
*/

// usage example: drawPoint({x:100, y:100});
/*const drawPoint = function (position)
{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.lineWidth = 25;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#E53935";
	ctx.beginPath();
	ctx.moveTo(position.x, position.y);
	ctx.lineTo(position.x, position.y);
	ctx.stroke();
}*/

/*
const drawWall = function(x, y, size) {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#2962FF";
	ctx.fillRect(x, y, size, size);
}

const drawSquare = function(x, y, size) {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#eeeee4";
	ctx.strokeStyle = "black";
	ctx.strokeRect(x, y, size, size);
}
*/

/*
const renderMap = function()
{
	let x = 0;
	let y = 0;
	for (const line of map) {
		for (const elm of line) {
			if (elm)
				drawWall(x, y, 50);
			else 
				drawSquare(x, y, 50);
			x += 50;
		}
		x = 0;
		y += 50;
	}
}
*/
/*
const degreeToRadian = function(degree){
	return (0.0174532925 * degree);
}
*/


// usage example: slopCalc({x:100, y:100}, {x:200, y:100});
const slopCalc = function(p1, p2) {
	const y = p2.y - p1.y;
	const x = p2.x - p1.x;
	let signal = 1;
	let res;

	//if (y < 0 || x < 0)
	//	signal = -1;
	res = y / x;
	//if (signal < 0 && res > 0)
	//	res *= signal;

	if (!y)
		return 0;
	if (!x)
		return 1000;
	return (res);
}

const getDir = function(p1, p2) {
	return {
		x: p2.x - p1.x,
		y: p2.y - p1.y
	}
}

const slopCalc1 = function(p1, p2) {
	const y = p2.y - p1.y;
	const x = p2.x - p1.x;
	let signal = 1;
	let res;

	//if (y < 0 || x < 0)
	//	signal = -1;

	res = x / y;
	//if (signal < 0 && res > 0)
	//	res *= signal;
	
	if (!y)
		return 0;
	if (!x)
		return 1000;
	return (res);
}

class Wall {
	constructor(x1, y1, x2, y2) {
		this.sPoint = {x: x1, y: y1};
		this.ePoint = {x: x2, y: y2};
	}

	show() {
		drawLine(this.sPoint, this.ePoint);
	}
};

// usage example: getPosObjXY({x:100, y:100}, 45);
//example return: obj = {x: 10, y: 10}
/*const getPosObjXY = function (pos, angleDegree){
	const radians = degreeToRadian(angleDegree);
	return {
		x: Math.round(RADIUS * Math.cos(radians) + pos.x),
		y: Math.round(-RADIUS * Math.sin(radians) + pos.y)
	};
}

const getPosObjXYRad = function (pos, angleDegree, rad){
	const radians = degreeToRadian(angleDegree);
	return {
		x: Math.round(rad * Math.cos(radians) + pos.x),
		y: Math.round(-rad * Math.sin(radians) + pos.y)
	};
}*/

const wall1 = new Wall(0, 0, 1200, 0);
const wall2 = new Wall(0, 0, 0, 1200);
const wall3 = new Wall(0, 1200, 1200, 1200);
const wall4 = new Wall(1200, 0, 1200, 1200);

class Ray {
	constructor(x, y, angleDegree) {
		this.pos = {x: x, y: y};
		this.angleDegree = angleDegree;
		this.angleRadians = degreeToRadian(angleDegree);
		this.dir = getPosObjXY(this.pos, angleDegree);
		this.slop = slopCalc(this.pos, this.dir);
	}

	show() {
		console.log("####################");
		console.log("angle:", this.angleDegree, "slop:", this.slop)
		console.log("pos: ", "x:", this.pos.x, "y:", this.pos.y);
		console.log("dir: ", "x:", this.dir.x, "y:", this.dir.y);
		drawLine(this.pos, this.dir);
	}

	updatePos(pos) {
		this.pos = pos;
		this.dir = getPosObjXY(this.pos, this.angleDegree);
	}

	updateDir(angle){
		this.angleDegree += angle;
		if (this.angleDegree < 0)
			this.angleDegree += 360;
		else if (this.angleDegree >= 360)
			this.angleDegree -= 360;
		this.angleRadians = degreeToRadian(this.angleDegree);
		this.dir = getPosObjXY(this.pos, this.angleDegree);
		this.slop = slopCalc(this.pos, this.dir);
	}
	
	cast2()
	{
		const slopX = slopCalc(this.pos, getPosObjXYRad(this.pos, this.angleDegree, 1000));
		const slopY = slopCalc1(this.pos, getPosObjXYRad(this.pos, this.angleDegree, 1000));
		this.slop = slopCalc(this.pos, getPosObjXYRad(this.pos, this.angleDegree, 1000));

		console.log("SLOP:", this.slop);

		const sX = Math.sqrt(1 + slopX * slopX);
		const sY = Math.sqrt(1 + slopY * slopY);
		let stepX;
		let stepY;

		let rayLengthX;
		let rayLengthY;

		let mPos = getMapPos(this.pos.x, this.pos.y);
		let rPos = getMapPosRaw(this.pos.x, this.pos.y);

		let mapPos = {
			x: mPos.j,
			y: mPos.i
		}

		let rayPos = {
			x: rPos.j,
			y: rPos.i
		}
		// j = x
		// i = x

		const rayDir = getDir(this.pos, this.dir);

		if (rayDir.x < 0) {
			stepX = -1;
			rayLengthX = (rayPos.x - mapPos.x) * sX;
		}
		else {
			stepX = 1;
			rayLengthX = ((mapPos.x + 1) - rayPos.x) * sX;
		}
		if (rayDir.y < 0) {
			stepY = -1;
			rayLengthY = (rayPos.y - mapPos.y) * sY;
		}
		else {
			stepY = 1;
			rayLengthY = ((mapPos.y + 1) - rayPos.y) * sY;
		}
		console.log("length: ", "x:", rayLengthX, "y:", rayLengthY);
		
		let side;
		let hitWall = false;
		while (!hitWall)
		{
			if (rayLengthX < rayLengthY){
				mapPos.x += stepX;
				rayLengthX += sX;
				side = 1 * stepX;
			}
			else {
				mapPos.y += stepY;
				rayLengthY += sY;
				side = 2 * stepY;			
			}
			console.log("mapPos:", mapPos);

			if (map[mapPos.y][mapPos.x])
				hitWall = true;
		}
		console.log("side:", side);
		console.log("posicao:", mapPos);

		let pt = getIntersectPoint(side, this.pos, this.slop, {i: mapPos.y, j: mapPos.x});
		
		pt.x = Math.round(pt.x);
		pt.y = Math.round(pt.y);

		console.log("Intersect Point: ", pt);

		drawLine(this.pos, pt);

		return ;
	}
	
};

class Player {
	constructor (x, y) {
		this.pos = {x: x, y: y};
		this.rays = [];
		//this.rays.push(new Ray(x, y, 0));
		/*for (let i = 0; i <= 45; i++)
			this.rays.push(new Ray(x, y, i));
		for (let i = 314; i <= 359; i++)
			this.rays.push(new Ray(x, y, i));*/

		for (let i = 0; i <= 22; i += 0.5)
			this.rays.push(new Ray(x, y, i));
		for (let i = 337; i <= 359; i += 0.5)
			this.rays.push(new Ray(x, y, i));
		
	}

	updateRaysPos() {
		for (let i = 0; i < this.rays.length; i++)
			this.rays[i].updatePos(this.pos);
	}

	moveForward() {
		const ray = this.rays[0];

		this.pos = getPosObjXY(this.pos, ray.angleDegree);
		this.updateRaysPos();
	}

	moveBack() {
		const ray = this.rays[0];

		this.pos = getPosObjXY(this.pos, ray.angleDegree - 180);
		this.updateRaysPos();
	}

	moveRight() {
		const ray = this.rays[0];

		this.pos = getPosObjXY(this.pos, ray.angleDegree - 90);
		this.updateRaysPos();
	}

	moveLeft() {
		const ray = this.rays[0];

		this.pos = getPosObjXY(this.pos, ray.angleDegree + 90);
		this.updateRaysPos();
	}

	updateRays(dir) {
		for (let i = 0; i < this.rays.length; i++)
			this.rays[i].updateDir(dir);
	}

	show() {
		drawPoint(this.pos);
		//this.ray.show();
		for(const ray of this.rays)
			ray.show();
	}
};

const player = new Player(100, 100);
const wall = new Wall(300, 100, 300, 300);

/*
const renderScene = function (){
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = MAP_HEIGHT;
	canvas.width = MAP_WIDTH;

	//wall.show();
	player.show();

	for (const ray of player.rays)
	{
		let intersectPoint = ray.cast2();
		if (intersectPoint) {
			//drawLine(ray.pos, intersectPoint);
			//console.log("intersectPoint:", intersectPoint);
		}
	}
	renderMap();
}
*/


const STEP_WALK			= 10;
const STEP_ROT 			= 5;
const CANVAS_HEIGHT 	= 960;
const CANVAS_WIDTH 		= 960;
const MAP_HEIGHT 		= 24;
const MAP_WIDTH 		= 24;
const SQUARE_SIZE 	= CANVAS_HEIGHT / MAP_HEIGHT;


const player1 = new Player1({x:100, y:100}, 0);

document.addEventListener("keyup", (e) => {
	player1.walk(STEP_WALK, e.key);
	player1.rotation(STEP_ROT, e.key);
	renderScene();
});

const renderScene = function (){
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = CANVAS_HEIGHT;
	canvas.width = CANVAS_WIDTH;

	console.log(SQUARE_SIZE);
	renderMap(SQUARE_SIZE);
	player1.show();
}

window.addEventListener("load", () => {
	renderScene();
});
