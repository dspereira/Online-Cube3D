const resizeCanvas = function ()
{
	const canvas = document.querySelector("#canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
}

window.addEventListener("load", () =>{
	const canvas = document.querySelector("#canvas");
	const contex = canvas.getContext("2d");

	//Resizing canvas - will have the size of browser window
	resizeCanvas();
});

window.addEventListener("resize", resizeCanvas);
