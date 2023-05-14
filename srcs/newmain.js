function RGBAFactory(hex)
{
	return {
		getRed(){
			return ((hex >> 24) & 0xFF);
		},
		getGreen(){
			return ((hex >> 16) & 0xFF);
		},
		getBlue(){
			return ((hex >> 8) & 0xFF);
		},
		getAlpha(){
			return (hex & 0xFF);
		}	
	}
}

/*
function RGBAFactory_1(red, green, blue, alpha)
{
	return {
		getRed(){
			return (red);
		},
		getGreen(){
			return (green);
		},
		getBlue(){
			return (blue);
		},
		getAlpha(){
			return (alpha);
		}	
	}
}
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const frame = new Frame(ctx.createImageData(1000, 1000));

for (let i = 0; i < 1000; i++){
	for (let j = 0; j < 1000; j++){
		frame.setPixelColor(j,i,RGBAFactory(0xff0000ff));
	}
}
ctx.putImageData(frame.getFrame(), 0, 0);
