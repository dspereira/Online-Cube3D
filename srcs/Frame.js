/*function RgbaHexFactory(hex)
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
*/

function RgbaHexFactory(hex)
{
	return {
		red: (hex >> 24) & 0xFF,
		green: (hex >> 16) & 0xFF,
		blue: (hex >> 8) & 0xFF,
		alpha: hex & 0xFF
	}
}

function RgbaFactory(red, green, blue, alpha)
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

class Frame {
	#frame;
	#ctx;
	#bpp;
	#lineLen;

	#pos;
	#col;
	#numWrite;


	constructor(ctx, x, y) 
	{
		this.#ctx = ctx;
		this.#frame = ctx.createImageData(x, y);
		this.#bpp = 4;
		this.#lineLen = this.#bpp * x;
		this.#pos = 0;
		this.#col = 0;
		this.#numWrite = 0;
	}

	getFrame()
	{
		return (this.frame);
	}

	getPixelColor(x, y)
	{
		const bpp = 4;
		const lineLen = bpp * this.#frame.width;
		const pos = x * bpp + y * lineLen;

		return (RgbaFactory(
				this.#frame.data[pos], 
				this.#frame.data[pos + 1], 
				this.#frame.data[pos + 2], 
				this.#frame.data[pos + 3]
			)
		);
	}

	setPixelColor(x, y, colorRgbaHex)
	{
		// verificar se x é superior a weith
		// verificar se x é superior a height

		const pos = x * this.#bpp + y * this.#lineLen;

		this.#frame.data[pos + 3] =  colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos + 2] = colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos + 1] = colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos] = colorRgbaHex & 0xFF;
	}

	setNextPixelColor(colorRgbaHex)
	{
		let pos = this.#pos;

		this.#frame.data[pos + 3] =  colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos + 2] = colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos + 1] = colorRgbaHex & 0xFF;
		colorRgbaHex = colorRgbaHex >> 8;
		this.#frame.data[pos] = colorRgbaHex & 0xFF;	

		//this.#pos += this.#bpp;
		this.#pos += this.#lineLen;
		this.#numWrite++;
		if (this.#numWrite >= 900)
		{
			this.#numWrite = 0;
			this.#col += this.#bpp;
			this.#pos = this.#col;
		}
		
	}

	resetFramePos()
	{
		this.#pos = 0;
		this.#col = 0;
	}

	display()
	{
		this.#ctx.putImageData(this.#frame, 0, 0);
	}
}
