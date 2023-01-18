const degreeToRadian = function(degree){
	return (0.0174532925 * degree);
}

const getNewPos = function(initPos, angle, distance) {
	const radians = degreeToRadian(angle);
	return {
		x: Math.round(distance * Math.cos(radians) + initPos.x),
		y: Math.round(-distance * Math.sin(radians) + initPos.y)
	};
}

const normalizeAngles = function(angle)
{
	if (angle < 0)
		angle += 360;
	else if (angle >= 360)
		angle -= 360;
	return angle;
}

const distanceX = function(initPos, finalPos) {
	return (finalPos.x - initPos.x);
}

const distanceY = function(initPos, finalPos) {
	return (finalPos.y - initPos.y);
}

const mapToCanvasDistConverter = function(distance) {
	return (distance * (SQUARE_SIZE));
}

/*
const getDistanceWallCamera = function(player) {
	let angle;
	let dis;

	for(const ray of player.rays) {
		angle = Math.abs(player.dir - ray.dir);
		if (angle > VISION / 2)
			angle = Math.abs((player.dir + 360) - ray.dir);
		console.log(angle);
	}
}
*/

const getDistanceWallCamera = function(player, ray) {
	let angle;
	let dist;

	angle = Math.abs(player.dir - ray.dir);
	if (angle > VISION / 2)
		angle = Math.abs((player.dir + 360) - ray.dir);
	//console.log(angle);

	dist = ray.distance * Math.cos(degreeToRadian(angle));
	//console.log("ray.distance:", ray.distance);
	//console.log("new distance:", dist);
	return (dist);
}