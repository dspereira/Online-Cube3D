class Frame {
	#frame;
	constructor(frame) 
	{
	   this.frame = frame;
	}

	getFrame()
	{
		return (this.frame);
	}
	getPixelColor(x, y)
	{
		/*const bpp = 4;
		const lineLen = bpp * this.frame.width;
		const pos = x * bpp + y * lineLen;

		return (RGBAFactory_1(
			this.frame.data[pos], 
			this.frame.data[pos + 1], 
			this.frame.data[pos + 2], 
			this.frame.data[pos + 3])
		);*/
	}

	setPixelColor(x, y, colorRgbaObj)
	{
		// verificar se x é superior a weith
		// verificar se x é superior a height
		const bpp = 4;
		const lineLen = bpp * this.frame.width;
		const pos = x * bpp + y * lineLen;

		this.frame.data[pos] = colorRgbaObj.getRed();
		this.frame.data[pos + 1] = colorRgbaObj.getGreen();
		this.frame.data[pos + 2] = colorRgbaObj.getBlue();
		this.frame.data[pos + 3] = colorRgbaObj.getAlpha();
	}
}