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

	#xSize
	#ySize

    #pixelMatrix;
    #frameBuff;

	#x;
	#valueCalc;

	constructor(ctx, x, y) 
	{
		this.#ctx = ctx;
		this.#frame = ctx.createImageData(x, y);
		this.#bpp = 4;
		this.#lineLen = this.#bpp * x;
		this.#xSize = x;
		this.#ySize = y;

		this.initPixelMatrix();

        this.#frameBuff = new Array(x * y * 4);

		this.#x = 0;
		this.#valueCalc = 0;
	}

	initPixelMatrix()
	{
		let pos = 0;
		let line = [];
		this.#pixelMatrix = [];
		
		for (let i = 0; i < this.#ySize; i++)
		{
			for (let j = 0; j < this.#xSize; j++)
			{
				/*line.push({
					rPos: pos,
					gPos: pos + 1,
					bPos: pos + 2,
					aPos: pos + 3
				});*/

				line.push(pos);
				pos += this.#bpp;
			}
			this.#pixelMatrix.push(line);
			line = [];
		}
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
	
	/*
	setPixelColor(x, y, colorRgbaHex)
	{
        let pos = 0;

		
       	if (x < this.#xSize && y < this.#ySize)
        {
			pos = x * this.#bpp + y * this.#lineLen;
			this.#frame.data[pos] = (colorRgbaHex >> 24) & 0xFF;
			this.#frame.data[pos + 1] = (colorRgbaHex >> 16) & 0xFF;
			this.#frame.data[pos + 2] = (colorRgbaHex >> 8) & 0xFF;
			this.#frame.data[pos + 3] = colorRgbaHex & 0xFF;
		}

		
        if (x < this.#xSize && y < this.#ySize)
        {
			pos = this.#pixelMatrix[y][x];

			this.#frame.data[pos] = (colorRgbaHex >> 24) & 0xFF;
			this.#frame.data[pos + 1] = (colorRgbaHex >> 16) & 0xFF;
			this.#frame.data[pos + 2] = (colorRgbaHex >> 8) & 0xFF;
			this.#frame.data[pos + 3] = colorRgbaHex & 0xFF;
		}
		
	}
	*/

	
	setPixelColor(x, y, colorRgbaHex)
	{
        let pos = 0;

		
       	if (x < this.#xSize && y < this.#ySize)
        {
			pos = x * this.#bpp + y * this.#lineLen;
			this.#frame.data[pos] = (colorRgbaHex >> 24) & 0xFF;
			this.#frame.data[pos + 1] = (colorRgbaHex >> 16) & 0xFF;
			this.#frame.data[pos + 2] = (colorRgbaHex >> 8) & 0xFF;
			this.#frame.data[pos + 3] = colorRgbaHex & 0xFF;
		}
	}

	setPixelColor(x, y, colorRgbaHex)
	{
        let pos = 0;
		
        if (x < this.#xSize && y < this.#ySize)
        {
			if (x != this.#x)
			{
				this.#x = x;
				this.#valueCalc = x * this.#bpp;
			}
			pos = this.#valueCalc + y * this.#lineLen;
			this.#frame.data[pos] = (colorRgbaHex >> 24) & 0xFF;
			this.#frame.data[pos + 1] = (colorRgbaHex >> 16) & 0xFF;
			this.#frame.data[pos + 2] = (colorRgbaHex >> 8) & 0xFF;
			this.#frame.data[pos + 3] = colorRgbaHex & 0xFF;
		}
	}
	

	display()
	{
		this.#ctx.putImageData(this.#frame, 0, 0);
	}
}
