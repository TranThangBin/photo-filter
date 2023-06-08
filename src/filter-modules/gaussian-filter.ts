export default (imageData: ImageData, kernelSize: number, sigma: number) => {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const result = new ImageData(width, height);

    // Calculate the number of pixels to pad on each side of the image
    const padding = Math.floor(kernelSize / 2);

    // Create the Gaussian kernel
    const kernel = makeGaussKernel(sigma, kernelSize);

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

                    // Calculate the kernel weight
                    const weight =
                        kernel[(ky + padding) * kernelSize + (kx + padding)];

                    // Add the weighted pixel values to the sum
                    sumR += pixels[pixelIndex] * weight;
                    sumG += pixels[pixelIndex + 1] * weight;
                    sumB += pixels[pixelIndex + 2] * weight;
                    sumA += pixels[pixelIndex + 3] * weight;
                }
            }

            // Set the result pixel values to the weighted sum
            const resultIndex = (y * width + x) * 4;
            result.data[resultIndex] = sumR;
            result.data[resultIndex + 1] = sumG;
            result.data[resultIndex + 2] = sumB;
            result.data[resultIndex + 3] = sumA;
        }
    }

    return result;
};

function makeGaussKernel(sigma: number, kernelSize: number) {
    const kernel = new Float32Array(kernelSize * kernelSize);
    const s2 = sigma * sigma;
    let sum = 0;

    for (let y = 0; y < kernelSize; y++) {
        for (let x = 0; x < kernelSize; x++) {
            const dx = x - (kernelSize - 1) / 2;
            const dy = y - (kernelSize - 1) / 2;
            const value =
                Math.exp(-(dx * dx + dy * dy) / (2 * s2)) / (2 * Math.PI * s2);
            kernel[y * kernelSize + x] = value;
            sum += value;
        }
    }

    for (let i = 0; i < kernel.length; i++) {
        kernel[i] /= sum;
    }

    return kernel;
}
