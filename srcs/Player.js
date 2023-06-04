/**
 * Create a new Player object.
 * @param {Object} posObj - The position object {x, y}.
 * @param {number} dirDegree - The direction in degrees.
 */


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

		this.frameBuff = new Array(900 * 900);
		
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

	// tem de ser refeita
	show() {
		drawPoint(this.pos);
		for(const ray of this.rays)
			ray.show();
	}

	
	render(frame) {
		const C_HEIGHT		= 900;
		const C_WIDTH		= 900;
		const MAX_DISTANCE	= 900;
		let x = 0;
		let y;
		let lineSize;
		let color;
		let distToWall;
		let index;

		for (const [i, ray] of player.rays.entries()) {
			distToWall = getDistanceWallCamera(player, ray);
	
			if (ray.side == 1)
				color = 0x662828ff;
			if (ray.side == -1)
				color = 0x133337ff;
			if (ray.side == 2)
				color = 0x13A000ff;
			if (ray.side == -2)
				color = 0x9EC9CFff;


			//lineSize = Math.abs(MAX_DISTANCE / (distToWall/10));

			lineSize = Math.abs(MAX_DISTANCE / (distToWall/10))
			y = Math.floor((C_HEIGHT / 2) - (lineSize / 2));

			index = 0;

			while (index < y)
			{
				frame.setPixelColor(x, index, 0x66CCCCFF);
				index++;
			}
			index = 0;
			while (index < lineSize)
			{
				frame.setPixelColor(x, y, color);
				index++;
				y++;
			}
			while (y < C_HEIGHT)
			{
				frame.setPixelColor(x, y, 0xf2d4c2ff);
				y++;
			}
			x++;
		}
		frame.display();
	}

	/*
	render(frame) {
		const C_HEIGHT		= 900;
		const C_WIDTH		= 900;
		const MAX_DISTANCE	= 900;
		let x = 0;
		let y;
		let lineSize;
		let color;
		let distToWall;
		let index;

		let line;

		frame.resetFramePos();

		for (const [i, ray] of player.rays.entries()) {

			
			distToWall = getDistanceWallCamera(player, ray);
	
			if (ray.side == 1)
				color = 0x662828ff;
			if (ray.side == -1)
				color = 0x133337ff;
			if (ray.side == 2)
				color = 0x13A000ff;
			if (ray.side == -2)
				color = 0x9EC9CFff;


			//lineSize = Math.abs(MAX_DISTANCE / (distToWall/10));

			lineSize = Math.abs(MAX_DISTANCE / (distToWall/10))
			y = Math.floor((C_HEIGHT / 2) - (lineSize / 2));

			index = 0;
			line = 0;

			//const pos = x * this.#bpp + y * this.#lineLen;
			const pos = 0;

			while (index < 900)
			{
				if (index < y)
				{
					pos = x * 4 + y * 900 * 4;

					this.frameBuff[pos] = 0x66CCCCFF & 0xFF;
					this.frameBuff[pos + 1] = (0x66CCCCFF >> 8) & 0xFF;
					this.frameBuff[pos + 2] = (0x66CCCCFF >> 16) & 0xFF;
					this.frameBuff[pos + 3] = (0x66CCCCFF >> 24) & 0xFF;

					//frame.setNextPixelColor(0x66CCCCFF);

				}
				else if (index >= y && line < lineSize)
				{
					//frame.setNextPixelColor(color);
					line++;
				}
				else
				{

					//frame.setNextPixelColor(0xf2d4c2ff);
				} 
				index++;
			}
			
		}
		
		//frame.display();
	}
	*/
	
};
