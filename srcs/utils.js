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