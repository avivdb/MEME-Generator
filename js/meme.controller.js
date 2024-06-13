var gElCanvas
var gCtx
var gSelectedImage
var gStrokeColor
var gFillColor
var linePosition = [{ x: 50, y: 50 }, { x: 50, y: 450 }]


function onSelectImage(elImage) {
    createMeme(elImage)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onTypeText(elText, selectedLineIdx) {
    console.log('elText:', elText);
    setLineTxt(elText, selectedLineIdx)
    renderMeme()
}

function onFillColor(elColor, selectedLineIdx) {
    setFillColor(elColor, selectedLineIdx)
    // gFillColor = elColor
}
function onStrokeColor(elColor, selectedLineIdx) {
    setStrokeColor(elColor, selectedLineIdx)
    gStrokeColor = elColor
}
function onChangeFontSize(operator, selectedLineIdx) {
    changeFontSize(operator, selectedLineIdx)
}

function renderMeme() {

    const meme = gMeme
    // console.log('rendermMeme meme:', meme);
    const imgId = meme.selectedImgId
    drawImg(imgId)

    for (var i = 0; i <= 1; i++) {
        const line = meme.lines[i]
        var elInput = document.querySelector(`.txt-line-${i}`)
        elInput.value = line.txt
        console.log('line:', line);
        drawText(line.txt, linePosition[i].x, linePosition[i].y, line.size, line.color)

    }
    console.log('meme:', meme);
    console.log('imgId:', imgId);


}