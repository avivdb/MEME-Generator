var gElCanvas
var gCtx
var gSelectedImage
var gStrokeColor
var gFillColor
let gStartPos
var isOpen = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
}

function renderMeme() {

    const meme = gMeme

    const imgId = meme.selectedImgId
    drawImg(imgId)

    for (var i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i]
        var elInput = document.querySelector(`.txt`)
        elInput.value = line.txt
        drawText(line.txt, line.pos.x, line.pos.y, line.size, line.color, line.align, line.fontFamily)
    }

}

function onTypeText(elText) {

    setLineTxt(elText)
    renderMeme()
    updateEditor()
}

function onFillColor(elColor) {
    setFillColor(elColor)
    renderMeme()
    updateEditor()

}

function onStrokeColor(elColor) {
    setStrokeColor(elColor)
    renderMeme()
    updateEditor()

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

        ev.preventDefault()

        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    }
    return pos
}

function onDown(ev) {

    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return

    setLineDrag(true)

    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos

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
    setFont(elFont)
}

function toggleMenu() {
    document.body.classList.toggle("menu-open")
}

function onRandomMeme() {
    gMeme = randomMeme()
    renderMeme()
    onShowEditor()
}

function onMoreFeatures() {
    elMenue = document.querySelector('.more-features-menu')
    elMenue.style.display = (isOpen) ? 'none' : 'grid'
    isOpen = !isOpen
}