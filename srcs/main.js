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
	ctx.lineWidth = 8;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(position.x, position.y);
	ctx.lineTo(position.x, position.y);
	ctx.stroke();	
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
	constructor(x, y) {
		this.pos = {x: x, y: y};
		this.dir = {x: 1, y: 0};
	}

	show() {
		const translateDir = {
			x: this.pos.x + this.dir.x * 10,
			y: this.pos.y + this.dir.y * 10,
		};
		drawLine(this.pos, translateDir);
	}

	update(x, y) {
		this.pos.x += x;
		this.pos.y += y;
	}

	cast(wall) {
		const x1 = wall.sPoint.x;
		const y1 = wall.sPoint.y;
		const x2 = wall.ePoint.x;
		const y2 = wall.ePoint.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x * 10;
		const y4 = this.pos.y + this.dir.y * 10;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (!den)
			return ;

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
		if (t > 0 && t < 1 && u > 0) {

			return {
				x: x1 + t * (x2 - x1), 
				y: y1 + t * (y2 - y1)
			};
		}
		else 
			return ;
	}
};

class Player {
	constructor (x, y) {
		this.pos = {x: x, y: y};
		this.ray = new Ray(x, y);

	}

	update(x, y) {
		this.pos.x += x;
		this.pos.y += y;
		this.ray.update(x, y);
	}

	show() {
		drawPoint(this.pos);
		this.ray.show();
	}
};

const player = new Player(100, 100);
const wall = new Wall(300, 100, 300, 300);

document.addEventListener("keydown", (e) => {
	if (e.key === 'w')
		player.update(0, -10);
	if (e.key === 's')
		player.update(0, 10);
	if (e.key === 'd')
		player.update(10, 0);
	if (e.key === 'a')
		player.update(-10, 0);

	renderScene();
});

const renderScene = function (){
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	wall.show();
	player.show();

	let intersectPoint = player.ray.cast(wall);
	if (intersectPoint) {
		console.log(intersectPoint);
	}
}

window.addEventListener("load", () =>{
	renderScene();
});