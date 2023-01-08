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

// usage example: drawLine({x:100, y:100}, {x:200, y:100});
const drawLine = function (startPoint, endPoint)
{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 1;
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
	ctx.beginPath();
	ctx.moveTo(position.x, position.y);
	ctx.lineTo(position.x, position.y);
	ctx.stroke();
}

const drawWall = function(x, y, size) {
	const ctx = canvas.getContext("2d");
	ctx.fillRect(x, y, size, size);

}

const renderMap = function()
{
	let x = 0;
	let y = 0;
	for (const line of map) {
		for (const elm of line) {
			if (elm)
				drawWall(x, y, 50);
			x += 50;
		}
		x = 0;
		y += 50;
		console.log('');
	}
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

const degreeToRadian = function(degree){
	return (0.0174532925 * degree);
}

class Ray {
	constructor(x, y, angleDegree) {
		this.pos = {x: x, y: y};
		this.angleDegree = angleDegree;
		this.angleRadians = degreeToRadian(angleDegree);
		this.dir = {
			x: 10 * Math.cos(this.angleRadians) + this.pos.x,
			y: -10 * Math.sin(this.angleRadians) + this.pos.y
		};
	}

	show() {
		drawLine(this.pos, this.dir);
	}

	update(x, y) {
		this.pos.x += x;
		this.pos.y += y;
		this.dir.x = 20 * Math.cos(this.angleRadians) + this.pos.x,
		this.dir.y = -20 * Math.sin(this.angleRadians) + this.pos.y	
	}

	updateDir(angle){
		this.angleRadians += degreeToRadian(angle);
		this.dir.x = 20 * Math.cos(this.angleRadians) + this.pos.x,
		this.dir.y = -20 * Math.sin(this.angleRadians) + this.pos.y	
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
		for (let i = 0; i <= 45; i++)
			this.rays.push(new Ray(x, y, i));
		for (let i = 314; i <= 359; i++)
			this.rays.push(new Ray(x, y, i));
	}

	updatePosition(x, y) {
		this.pos.x += x;
		this.pos.y += y;
		for (let i = 0; i < this.rays.length; i++)
			this.rays[i].update(x, y);
	}

	moveForward() {
		const ray = this.rays[0];
		let x = Math.cos(ray.angleRadians) * 10;
		let y = -Math.sin(ray.angleRadians) * 10;
		this.updatePosition(x, y);
	}

	moveUp() {
		const ray = this.rays[0];
		let x = Math.cos(ray.angleRadians) * 10;
		let y = -Math.sin(ray.angleRadians) * 10;

		this.updatePosition(x, y);
	}

	moveBack() {
		const ray = this.rays[0];
		let x = Math.cos(ray.angleRadians) * -10;
		let y = -Math.sin(ray.angleRadians) * -10;

		this.updatePosition(x, y);
	}

	moveRight() {
		const ray = this.rays[0];
		let x = Math.cos(ray.angleRadians - degreeToRadian(-90)) * -10;
		let y = -Math.sin(ray.angleRadians - degreeToRadian(-90)) * -10;

		this.updatePosition(x, y);
	}

	moveLeft() {
		const ray = this.rays[0];
		let x = Math.cos(ray.angleRadians - degreeToRadian(90)) * -10;
		let y = -Math.sin(ray.angleRadians - degreeToRadian(90)) * -10;

		this.updatePosition(x, y);
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
		player.updateRays(10);
	if (e.key === 'ArrowRight')
		player.updateRays(-10);
	renderScene();
});

const renderScene = function (){
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	//canvas.height = window.innerHeight;
	//canvas.width = window.innerWidth;
	canvas.height = 1200;
	canvas.width = 1200;

	//wall.show();
	player.show();

	for (const ray of player.rays)
	{
		//let intersectPoint = ray.cast(wall);
		/*if (intersectPoint) {
			console.log(intersectPoint);
		}*/
	}
	renderMap();
}

window.addEventListener("load", () => {
	renderScene();
});
