// 24x24
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

const RADIUS		= 50;
const ANGLE_STEP	= 1;

const MAP_HEIGHT	= 1200;
const MAP_WIDTH		= 1200;

const MAP_ROWS		= 24;
const MAP_COLUMNS	= 24;

// usage example: getPosMap({x:100, y:100});
// return obj = {i: 10, j: 5}
const getMapPos = function(x, y) {
	const mapStep = MAP_WIDTH / MAP_COLUMNS;

	return {
		i: Math.floor(y / mapStep),
		j: Math.floor(x / mapStep)
	}
}

const getCanvasPos = function(i, j) {
	const mapStep = MAP_WIDTH / MAP_COLUMNS;

	return {
		x: j * mapStep,
		y: i * mapStep
	}
}

// usage example: drawLine({x:100, y:100}, {x:200, y:100});
const drawLine = function (startPoint, endPoint)
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

// usage example: drawPoint({x:100, y:100});
const drawPoint = function (position)
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
}

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

const degreeToRadian = function(degree){
	return (0.0174532925 * degree);
}

// usage example: slopCalc({x:100, y:100}, {x:200, y:100});
const slopCalc = function(p1, p2) {
	const y = p2.y - p1.y;
	const x = p2.x - p1.x;

	if (!y)
		return 0;
	if (!x)
		return 1000;
	return (y / x);
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
const getPosObjXY = function (pos, angleDegree){
	const radians = degreeToRadian(angleDegree);
	return {
		x: Math.round(RADIUS * Math.cos(radians) + pos.x),
		y: Math.round(-RADIUS * Math.sin(radians) + pos.y)
	};
}

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

	// DEPRECATED
	/*update(x, y) {
		this.pos.x += x;
		this.pos.y += y;
		this.dir = getPosObjXY(this.pos, this.angleDegree);
	}*/

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
	
	cast2() {
		let mPos;
		let cPos;
		
		if (this.angleDegree >= 0 && this.angleDegree <= 90){
			mPos = getMapPos(this.pos.x, this.pos.y);
			cPos = getCanvasPos(mPos.i, mPos.j);
			let x = cPos.x + 50;
			let y = cPos.y;

			//verificar a distancia quando o x = cPos.x + 50
			//verificar a distancia quando o y = cPos.y
			// usar equacoes da trigonometria e verificar qual ponto est'a mais longe

		}
	}

	cast1() {
		let x = this.pos.x;
		let y = this.pos.y;
		let mPos;
		let cPos;
		/*console.log("antes:", this.slop);
		this.slop = slopCalc(this.dir, this.pos);
		console.log("depois:", this.slop);*/

		if (this.angleDegree == 0) {
			mPos = getMapPos(x, y);
			while (!map[mPos.i][mPos.j]) {
				mPos.j++;
			}
			cPos = getCanvasPos(mPos.i, mPos.j);
			return {
				x: cPos.x,
				y: this.pos.y
			}
		}
		else if (this.angleDegree == 180) {
			mPos = getMapPos(x, y);
			while (!map[mPos.i][mPos.j]) {
				mPos.j--;
			}
			cPos = getCanvasPos(mPos.i, mPos.j);
			return {
				x: cPos.x,
				y: this.pos.y
			}
		}
		else if (this.angleDegree == 90)
		{
			mPos = getMapPos(x, y);
			while (!map[mPos.i][mPos.j]) {
				mPos.i--;
			}
			cPos = getCanvasPos(mPos.i, mPos.j);
			return {
				x: this.pos.x,
				y: cPos.y
			}		
		}
		else if (this.angleDegree == 270)
		{
			mPos = getMapPos(x, y);
			while (!map[mPos.i][mPos.j]) {
				mPos.i++;
			}
			cPos = getCanvasPos(mPos.i, mPos.j);
			return {
				x: this.pos.x,
				y: cPos.y
			}		
		}
		else if (this.slop > 0 && this.slop < 1){
			// i y
			// j x
			mPos = getMapPos(x, y);
			while (!map[Math.round(mPos.i)][mPos.j]) {
				mPos.j++
				mPos.i += this.slop;
				//mPos.i += (1 / this.slop);
				//console.log("pos map:", mPos);
				//console.log("teste:", this.slop);
			}
			cPos = getCanvasPos(Math.round(mPos.i), mPos.j);
			console.log("m > 0 && m < 1");
			console.log("pos map:", mPos);
			console.log("pos canvas:",cPos);

			const wall1 = new Wall(cPos.x, cPos.y, cPos.x + 50, cPos.y);
			const wall2 = new Wall(cPos.x, cPos.y, cPos.x, cPos.y + 50);

			const pt1 = this.cast(wall1);
			const pt2 = this.cast(wall2);
			if (pt1)
				return pt1;
			else
				return pt2;
		}
		else if (this.slop > 1){
			// i y
			// j x
			mPos = getMapPos(x, y);
			while (!map[mPos.i][Math.round(mPos.j)]) {
				mPos.j += (1 / this.slop);
				mPos.i++;
				console.log("pos map:", mPos);
			}
			cPos = getCanvasPos(mPos.i, Math.round(mPos.j));
			console.log("m > 0 && m > 1");
			console.log("pos map:", mPos);
			console.log("pos canvas:",cPos);

			const wall1 = new Wall(cPos.x, cPos.y, cPos.x + 50, cPos.y);
			const wall2 = new Wall(cPos.x, cPos.y, cPos.x, cPos.y + 50);

			const pt1 = this.cast(wall1);
			const pt2 = this.cast(wall2);
			if (pt1)
				return pt1;
			else
				return pt2;
		}

		return ;
	}

	cast(wall) {

		let intersectPoint;

		const x1 = wall.sPoint.x;
		const y1 = wall.sPoint.y;
		const x2 = wall.ePoint.x;
		const y2 = wall.ePoint.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.dir.x;
		const y4 = this.dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (!den)
			return ;

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
		if (t > 0 && t < 1 && u > 0) {
			intersectPoint = {
				x: x1 + t * (x2 - x1), 
				y: y1 + t * (y2 - y1)	
			}
			drawLine(this.pos, intersectPoint);
			return intersectPoint;
		}
		else 
			return ;
	}
};

class Player {
	constructor (x, y) {
		this.pos = {x: x, y: y};
		this.rays = [];
		this.rays.push(new Ray(x, y, 0));
		/*for (let i = 0; i <= 45; i++)
			this.rays.push(new Ray(x, y, i));
		for (let i = 314; i <= 359; i++)
			this.rays.push(new Ray(x, y, i));
		
		*/
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

document.addEventListener("keydown", (e) => {
	if (e.key === 'w')
		player.moveForward()
	if (e.key === 's')
		player.moveBack();
	if (e.key === 'd')
		player.moveRight();
	if (e.key === 'a')
		player.moveLeft();
	if (e.key === 'ArrowLeft')
		player.updateRays(ANGLE_STEP);
	if (e.key === 'ArrowRight')
		player.updateRays(-ANGLE_STEP);
	renderScene();
});

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
			drawLine(ray.pos, intersectPoint);
			//console.log(intersectPoint);
		}
	}
	renderMap();
}

window.addEventListener("load", () => {
	renderScene();
});
