export default (inputFile, inputImg) => {
    if (inputFile.files && inputFile.files.length > 0) {
        const file = inputFile.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target)
                inputImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};
