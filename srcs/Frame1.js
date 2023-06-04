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

	#pixelMatrix;

	#xSize
	#ySize

	#lineBuff;


	constructor(ctx, x, y) 
	{
		this.#ctx = ctx;
		this.#frame = ctx.createImageData(x, y);
		this.#bpp = 4;
		this.#lineLen = this.#bpp * x;
		this.#pos = 0;
		this.#col = 0;
		this.#numWrite = 0;

		this.#xSize = x;
		this.#ySize = y;



		//this.#pixelMatrix = [x][y];
		this.initPixelMatrix();
		//console.log(this.#pixelMatrix[900][899]);

		this.#lineBuff = {
			lineNum: 0,
			line: this.#pixelMatrix[0]
		}

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
		//console.log(this.#pixelMatrix);
		//console.log(this.#pixelMatrix[200][56]);
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

	setPixelColor1(x, y, colorRgbaHex)
	{
		/*if (this.#lineBuff.lineNum != x)
		{
			this.#lineBuff.lineNum = x;
			this.#lineBuff.line = this.#pixelMatrix[y]
		}*/

		let pos;
		

		if (x < this.#xSize && y < this.#ySize)
		{
			pos = this.#pixelMatrix[y][x];

			this.#frame.data[pos + 3] = colorRgbaHex & 0xFF;
			colorRgbaHex = colorRgbaHex >> 8;
			this.#frame.data[pos + 2] = colorRgbaHex & 0xFF;
			colorRgbaHex = colorRgbaHex >> 8;
			this.#frame.data[pos + 1] = colorRgbaHex & 0xFF;
			colorRgbaHex = colorRgbaHex >> 8;
			this.#frame.data[pos] = colorRgbaHex & 0xFF;
		}
	}

	/*
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
*/

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

		this.#pos += 4;
	}

	resetFramePos()
	{
		this.#pos = 0;
		this.#col = 0;
	}

	testeLoop()
	{
		for (let i = 0; i < 900 * 900; i++)
		{
			this.#frame.data[1] = 0xFF;
		}
	}

	display()
	{
		this.#ctx.putImageData(this.#frame, 0, 0);
	}
}
