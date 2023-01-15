class Ray1 {
	constructor(pos, dirDegree) {
		this.pos = pos;
		this.dir = dirDegree;
		this.distance = 30;
	}

	updatePos(pos) {
		this.pos = pos;
	}

	updateDir(angle) {
		this.dir += angle;
		if (this.dir < 0)
			this.dir += 360;
		else if (this.dir >= 360)
			this.dir -= 360;
	}

	cast() {
		let step = {x: 0, y: 0};
		const rayLength = {x: 0, y: 0};
		let side;
		const finalPos = getPosObjXYRad(this.pos, this.dir, 1000);
		const dx = distanceX(this.pos, finalPos);
		const dy = distanceY(this.pos, finalPos);
		const scale = {
			x: Math.sqrt(1 + ((dy/dx) * (dy/dx))),
			y: Math.sqrt(1 + ((dx/dy) * (dx/dy)))
		}
		const rayPosCell = getMapPosDecimal(this.pos.x, this.pos.y);
		const mapPos = getMapPos(this.pos.x, this.pos.y);

		console.log("inicital pos", this.pos);

		console.log("dx:", dx, "dy:", dy);
		console.log(scale);

		if (dx < 0) {
			step.x = -1;
			rayLength.x = (rayPosCell.x - mapPos.x) * scale.x;
		}
		else {
			step.x = 1;
			rayLength.x = ((mapPos.x + 1) - rayPosCell.x) * scale.x;
		}
		if (dy < 0) {
			step.y = -1;
			rayLength.y = (rayPosCell.y - mapPos.y) * scale.y;
		}
		else {
			step.y = 1;
			rayLength.y = ((mapPos.y + 1) - rayPosCell.y) * scale.y;
		}

		while (!map[mapPos.y][mapPos.x])
		{
			if (rayLength.x < rayLength.y){
				mapPos.x += step.x;
				rayLength.x += scale.x;
				side = 1 * step.x;
			}
			else {
				mapPos.y += step.y;
				rayLength.y += scale.y;
				side = 2 * step.y;
			}
		}
		this.setDistance(side, mapPos, scale);
	}

	setDistance(side, mapPos, scale) {
		let canvasPos = getCanvasPos(mapPos.x, mapPos.y);
		let finalDist = {x: 0, y: 0};

		if (side == 1) {
			finalDist.x = canvasPos.x;
			this.distance = (finalDist.x - this.pos.x) * scale.x;
		}
		else if (side == 2) {
			finalDist.y = canvasPos.y;
			this.distance = (finalDist.y - this.pos.y) * scale.y;
		}
		else if (side == -2) {
			finalDist.y = canvasPos.y + SQUARE_SIZE;
			this.distance = (this.pos.y - finalDist.y) * scale.y;
		}
		else if (side == -1) {
			finalDist.x = canvasPos.x + SQUARE_SIZE;
			this.distance =  (this.pos.x - finalDist.x) * scale.x;
		}
	}	

	show() {
		const finalPos = getPosObjXYRad(this.pos, this.dir, this.distance);
		console.log("---distance:", this.distance);
		console.log("---finalPos", finalPos);
		drawLine(this.pos, finalPos);
	}
};
