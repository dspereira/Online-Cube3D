const degreeToRadian = function(degree){
	return (0.0174532925 * degree);
}

const getPosObjXY = function (pos, angleDegree){
	const radians = degreeToRadian(angleDegree);
	return {
		x: Math.round(RADIUS * Math.cos(radians) + pos.x),
		y: Math.round(-RADIUS * Math.sin(radians) + pos.y)
	};
}

const getPosObjXYRad = function (pos, angleDegree, rad){
	const radians = degreeToRadian(angleDegree);
	return {
		x: Math.round(rad * Math.cos(radians) + pos.x),
		y: Math.round(-rad * Math.sin(radians) + pos.y)
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