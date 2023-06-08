import gaussianFilter from "../filter-modules/gaussian-filter.js";
import meanFilter from "../filter-modules/mean-filter.js";
import medianFilter from "../filter-modules/median-filter.js";

export default (
    inputImage: HTMLImageElement,
    outputImage: HTMLCanvasElement,
    filter: string,
    kernelSize: number,
    sigma: number
) => {
    const ctx = outputImage.getContext("2d");
    if (!ctx) return;
    outputImage.width = inputImage.width;
    outputImage.height = inputImage.height;
    ctx.drawImage(inputImage, 0, 0);
    const imageData = ctx.getImageData(
        0,
        0,
        outputImage.width,
        outputImage.height
    );

    let result;

    switch (filter) {
        case "gaussian":
            result = gaussianFilter(imageData, kernelSize, sigma);
            break;
        case "mean":
            result = meanFilter(imageData, kernelSize);
            break;
        case "median":
            result = medianFilter(imageData, kernelSize);
            break;
    }

    ctx.putImageData(result as ImageData, 0, 0);
};
