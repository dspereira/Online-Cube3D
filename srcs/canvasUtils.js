// usage example: drawPoint({x:100, y:100});
const drawPoint = function (pos)
{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.lineWidth = 25;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#E53935";
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
}

const drawLine = function (startPoint, endPoint)
{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#FF8A80";
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(endPoint.x, endPoint.y);
	ctx.stroke();
}

const drawWall = function(x, y, size) {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#2962FF";
	ctx.fillRect(x, y, size, size);
}

const drawFreeSpace = function(x, y, size) {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#eeeee4";
	ctx.strokeStyle = "black";
	ctx.strokeRect(x, y, size, size);
}