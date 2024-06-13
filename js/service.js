var gStrokeColor
var gFillColor
var gFontSize = 40
var gId = 1
var gImgs = _createImgs()

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImg() {
    const image = new Image()
}
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
    gCtx.font = `${gFontSize}px Arial`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function changeFontSize(operator) {
    if (operator === '+') gFontSize += 2
    if (operator === '-') gFontSize -= 2

}

function _createImg(id, url, keywords) {
    const img = { id, url, keywords }
    gId++
    return img
}

function _createImgs() {
    return [
        _createImg(gId, 'img/1.jpg', ['funny', 'trump']),
        _createImg(gId, 'img/2.jpg', ['cute', 'dogs'])
    ]
}