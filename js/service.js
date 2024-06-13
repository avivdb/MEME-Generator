var gStrokeColor
var gFillColor

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 40  //* Subtracting 20px padding from each side
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gStrokeColor
    gCtx.fillStyle = gFillColor
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    // gCtx.maxwidth = '400px'
}