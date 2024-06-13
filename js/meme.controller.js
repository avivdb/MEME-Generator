var gElCanvas
var gCtx
var gSelectedImage
var gStrokeColor
var gFillColor
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
// var linePositions = [{ x: 50, y: 50 }]
// var gSelectedLineIdx = linePositions.length

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()

}

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



function onTypeText(elText) {
    console.log('elText:', elText);
    setLineTxt(elText)
    renderMeme()
}

function onFillColor(elColor) {
    setFillColor(elColor)
    renderMeme()

    // gFillColor = elColor
}
function onStrokeColor(elColor) {
    setStrokeColor(elColor)
    renderMeme()

    // gStrokeColor = elColor
}
function onChangeFontSize(operator) {
    changeFontSize(operator)
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse ev
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}


function onDown(ev) {
    //* console.log('onDown')
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log('pos', pos)
    if (!isLineClicked(pos)) return

    setLineDrag(true)
    //* Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //* Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    //* The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}