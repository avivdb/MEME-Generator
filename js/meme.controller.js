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
        drawText(line.txt, line.pos.x, line.pos.y, line.size, line.color, line.align, line.fontFamily)

    }
    console.log('meme:', meme);
    console.log('imgId:', imgId);


}





function onTypeText(elText) {
    // console.log('elText:', elText);
    setLineTxt(elText)
    updateEditor()
    renderMeme()
}

function onFillColor(elColor) {
    setFillColor(elColor)
    renderMeme()
    updateEditor()


    // gFillColor = elColor
}
function onStrokeColor(elColor) {
    setStrokeColor(elColor)
    renderMeme()
    updateEditor()


    // gStrokeColor = elColor
}
function onChangeFontSize(operator) {
    changeFontSize(operator)
    renderMeme()
    updateEditor()

}


function onAddLine() {
    addLine()
    renderMeme()
    updateEditor()
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

function updateEditor() {
    const line = getLine()
    document.querySelector('.txt').value = line.txt
    document.querySelector('.fill').value = line.color.fill
    document.querySelector('.stroke').value = line.color.stroke
    document.querySelector('.font-select').value = line.fontFamily
}

function onAlignText(direction) {
    alignText(direction)
    elInput = document.querySelector('.txt')
    if (direction === 'right') {
        elInput.classList.remove('align-center')
        elInput.classList.remove('align-left')

    } else if (direction === 'center') {
        elInput.classList.remove('align-left')
        elInput.classList.remove('align-right')

    } else if (direction === 'left') {
        elInput.classList.remove('align-center')
        elInput.classList.remove('align-right')

    }
    elInput.classList.add(`align-${direction}`)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
}

function onSetFont(elFont) {
    console.log('elFont:', elFont);
    setFont(elFont)
}

function toggleMenu() {
    document.body.classList.toggle("menu-open")
}