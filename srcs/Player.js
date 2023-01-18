class Player {
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

		const halfVision = VISION / 2;

		console.log("dirDegree", dirDegree);

		//this.rays.push(new Ray(this.pos, normalizeAngles(0)));
		for (let i = dirDegree + halfVision; i > dirDegree; i -= RAY_DISTANCE)
			this.rays.push(new Ray(this.pos, normalizeAngles(i)));
		for (let i = dirDegree; i > dirDegree - halfVision; i -= RAY_DISTANCE)
			this.rays.push(new Ray(this.pos, normalizeAngles(i)));
		
	}

	updatePos(step, dir) {
		if (dir != undefined) {
			this.pos = getNewPos(this.pos, this.dir + dir, step);
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

	raycast() {
		for (const ray of this.rays) {
			ray.cast();
		 }
	}

	show() {
		drawPoint(this.pos);
		for(const ray of this.rays)
			ray.show();
	}
};
