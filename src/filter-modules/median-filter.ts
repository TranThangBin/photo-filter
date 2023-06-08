export default (imageData: ImageData, kernelSize: number) => {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const result = new ImageData(width, height);

    // Calculate the number of pixels to pad on each side of the image
    const padding = Math.floor(kernelSize / 2);

    // Loop through each pixel in the image
    for (let y = padding; y < height - padding; y++) {
        for (let x = padding; x < width - padding; x++) {
            // Initialize arrays to hold the pixel values in the kernel
            const valuesR = [];
            const valuesG = [];
            const valuesB = [];
            const valuesA = [];

            // Loop through each pixel in the kernel
            for (let ky = -padding; ky <= padding; ky++) {
                for (let kx = -padding; kx <= padding; kx++) {
                    // Calculate the pixel index in the kernel
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;

                    // Add the pixel values to the arrays
                    valuesR.push(pixels[pixelIndex]);
                    valuesG.push(pixels[pixelIndex + 1]);
                    valuesB.push(pixels[pixelIndex + 2]);
                    valuesA.push(pixels[pixelIndex + 3]);
                }
            }

            // Calculate the median pixel values
            const medianR = median(valuesR);
            const medianG = median(valuesG);
            const medianB = median(valuesB);
            const medianA = median(valuesA);

            // Set the result pixel values to the median values
            const resultIndex = (y * width + x) * 4;
            result.data[resultIndex] = medianR;
            result.data[resultIndex + 1] = medianG;
            result.data[resultIndex + 2] = medianB;
            result.data[resultIndex + 3] = medianA;
        }
    }

    return result;
};

function median(values: Array<number>) {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2 === 0) return (values[half - 1] + values[half]) / 2.0;
    return values[half];
}
