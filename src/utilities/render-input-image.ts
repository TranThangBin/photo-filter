export default (inputFile: HTMLInputElement, inputImg: HTMLImageElement) => {
    if (inputFile.files && inputFile.files.length > 0) {
        const file = inputFile.files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target) inputImg.src = e.target.result as string;
        };

        reader.readAsDataURL(file);
    }
};
