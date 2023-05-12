const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imageData = ctx.createImageData(470, 310);
console.log(imageData);


// Iterate through every pixel
for (let i = 0; i < imageData.data.length; i += 4) {
    // Modify pixel data
    imageData.data[i + 0] = 190; // R value
    imageData.data[i + 1] = 0; // G value
    imageData.data[i + 2] = 210; // B value
    imageData.data[i + 3] = 255; // A value
}

ctx.putImageData(imageData, 0, 0);