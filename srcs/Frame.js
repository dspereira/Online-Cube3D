function RgbaHexFactory(hex)
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

	constructor(ctx, x, y) 
	{
		this.#ctx = ctx;
		this.#frame = ctx.createImageData(x, y);
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
		const bpp = 4;
		const lineLen = bpp * this.#frame.width;
		const pos = x * bpp + y * lineLen;
		const colorObj = RgbaHexFactory(colorRgbaHex);

		this.#frame.data[pos] = colorObj.getRed();
		this.#frame.data[pos + 1] = colorObj.getGreen();
		this.#frame.data[pos + 2] = colorObj.getBlue();
		this.#frame.data[pos + 3] = colorObj.getAlpha();
	}

	display()
	{
		this.#ctx.putImageData(this.#frame, 0, 0);
	}
}
