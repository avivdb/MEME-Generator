var gElCanvas
var gCtx
var gSelectedImage
var gStrokeColor
var gFillColor
var linePositions = [{ x: 50, y: 50 }]
var gSelectedLineIdx = linePositions.length

function renderMeme() {

    const meme = gMeme
    // console.log('rendermMeme meme:', meme);
    const imgId = meme.selectedImgId
    drawImg(imgId)

    for (var i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i]
        var elInput = document.querySelector(`.txt`)
        elInput.value = line.txt
        console.log('line:', line);
        drawText(line.txt, line.pos.x, line.pos.y, line.size, line.color)

    }
    console.log('meme:', meme);
    console.log('imgId:', imgId);


}

function onSelectImage(elImage) {
    createMeme(elImage)
    document.querySelector('.txt').value = gMeme.lines[0].txt
    document.querySelector('.fill').value = gMeme.lines[0].color.fill
    // document.querySelector('.fill-1').value = gMeme.lines[1].color.fill
    document.querySelector('.stroke').value = gMeme.lines[0].color.stroke
    // document.querySelector('.stroke-1').value = gMeme.lines[1].color.stroke

    renderMeme()
}



function onTypeText(elText, gSelectedLineIdx) {
    console.log('elText:', elText);
    setLineTxt(elText, gSelectedLineIdx)
    renderMeme()
}

function onFillColor(elColor, gSelectedLineIdx) {
    setFillColor(elColor, gSelectedLineIdx)
    renderMeme()

    // gFillColor = elColor
}
function onStrokeColor(elColor, gSelectedLineIdx) {
    setStrokeColor(elColor, gSelectedLineIdx)
    renderMeme()

    // gStrokeColor = elColor
}
function onChangeFontSize(operator, gSelectedLineIdx) {
    changeFontSize(operator, gSelectedLineIdx)
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()

}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}