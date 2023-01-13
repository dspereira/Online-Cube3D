class Player1 {
	constructor(pos, dirDegree) {
		this.pos = pos;
		this.dir = dirDegree;
		this.rays = [];
		this.movDir = {
			w: 0, s: 180, a: 90, d: 270
		}
		this.rotDir = {
			ArrowLeft: 1, ArrowRight: -1
		}

		const vision = 44;
		const halfVision = vision / 2;

		for (let i = dirDegree + halfVision; i > dirDegree; i--)
			this.rays.push(new Ray1(this.pos, normalizeAngles(i)));
		for (let i = dirDegree; i > dirDegree - halfVision; i--)
			this.rays.push(new Ray1(this.pos, normalizeAngles(i)));
	}

	updatePos(step, dir) {
		if (dir != undefined) {
			this.pos = getPosObjXYRad(this.pos, this.dir + dir, step);
			for (const ray of this.rays)
				ray.updatePos(this.pos);
		}
	}

	updateDir(step, rot) {
		if (rot != undefined) {
			this.dir +=  step * rot;
			for (const ray of this.rays)
				ray.updateDir(step * rot);
		}		
	}

	walk(step, key) {
		this.updatePos(step, this.movDir[key]);
	}

	rotation(step, key) {
		this.updateDir(step, this.rotDir[key]);
	}

	show() {
		drawPoint(this.pos);
		for(const ray of this.rays)
			ray.show();
	}
};

/*
class Player {
	constructor (x, y) {
		this.pos = {x: x, y: y};
		this.rays = [];


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
*/