

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 40  //* Subtracting 20px padding from each side
}