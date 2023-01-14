class Ray1 {
	constructor(pos, dirDegree) {
		this.pos = pos;
		this.dir = dirDegree;
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

	show() {
		const finalPos = getPosObjXYRad(this.pos, this.dir, 50);
		drawLine(this.pos, finalPos);
	}
};


/*
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
*/