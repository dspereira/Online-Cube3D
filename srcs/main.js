// usage example: drawLine({x:100, y:100}, {x:200, y:100});
const drawLine = function (startPoint, endPoint)
{
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(endPoint.x, endPoint.y);
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

window.addEventListener("load", () =>{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	//const wall = new Wall(300, 100, 300, 300);
	const wall = new Wall(300, 100, 300, 300);
	wall.show();

	const ray = new Ray(100, 200);
	ray.show();

	let intersectPoint = ray.cast(wall);
	if (intersectPoint) {
		console.log(intersectPoint);
	}

});
