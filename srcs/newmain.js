
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const frame = new Frame(ctx.createImageData(1000, 1000));


for (let i = 0; i < 1000; i++){
	for (let j = 0; j < 1000; j++){
		frame.setPixelColor(j, i, 0xff0000ff);
	}
}

const obj = frame.getPixelColor(100, 100);

console.log(obj.getRed());
console.log(obj.getBlue());
console.log(obj.getGreen());
console.log(obj.getAlpha());

ctx.putImageData(frame.getFrame(), 0, 0);
