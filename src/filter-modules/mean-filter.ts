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
            // Initialize the sum of the pixel values in the kernel
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            let sumA = 0;

            // Loop through each pixel in the kernel
            for (let ky = -padding; ky <= padding; ky++) {
                for (let kx = -padding; kx <= padding; kx++) {
                    // Calculate the pixel index in the kernel
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;

                    // Add the pixel values to the sum
                    sumR += pixels[pixelIndex];
                    sumG += pixels[pixelIndex + 1];
                    sumB += pixels[pixelIndex + 2];
                    sumA += pixels[pixelIndex + 3];
                }
            }

            // Calculate the mean pixel values
            const meanR = sumR / (kernelSize * kernelSize);
            const meanG = sumG / (kernelSize * kernelSize);
            const meanB = sumB / (kernelSize * kernelSize);
            const meanA = sumA / (kernelSize * kernelSize);

            // Set the result pixel values to the mean values
            const resultIndex = (y * width + x) * 4;
            result.data[resultIndex] = meanR;
            result.data[resultIndex + 1] = meanG;
            result.data[resultIndex + 2] = meanB;
            result.data[resultIndex + 3] = meanA;
        }
    }

    return result;
};
