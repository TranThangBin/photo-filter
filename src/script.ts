import renderInputImage from "./utilities/render-input-image.js";
import renderOutputImage from "./utilities/render-output-image.js";

const inputImage = document.getElementById("input-image") as HTMLImageElement;
const inputImageFile = document.getElementById(
    "input-image-file"
) as HTMLInputElement;
const filterBtn = document.getElementById("btn-filter") as HTMLButtonElement;

const outputImage = document.getElementById("canvas") as HTMLCanvasElement;
const downloadBtn = document.getElementById(
    "btn-download"
) as HTMLAnchorElement;

inputImageFile?.addEventListener("change", () => {
    renderInputImage(inputImageFile, inputImage);
    filterBtn.classList.remove("pointer-events-none");
});

filterBtn?.addEventListener("click", () => {
    renderOutputImage(
        inputImage,
        outputImage,
        getFilterOption().value,
        parseInt(getKernelSize().value),
        parseFloat(getSigma().value)
    );
    downloadBtn.classList.remove("pointer-events-none");
});

downloadBtn.addEventListener("click", () => {
    const dataURL = outputImage.toDataURL("image/png");
    downloadBtn.href = dataURL;
});

function getFilterOption() {
    return document.querySelector(
        '[name="filter"]:checked'
    ) as HTMLInputElement;
}

function getKernelSize() {
    return document.getElementById("kernelSize") as HTMLInputElement;
}

function getSigma() {
    return document.getElementById("sigma") as HTMLInputElement;
}
