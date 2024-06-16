
var gFontSize = 40
var gFontFamily = 'Ariel'
var gId = 1
var gImgs = _createImgs()
var gCurrLine = 0
var gLine

const funnySentences = [
    "When coffee kicks in hard.",
    "Dogs understand life better, obviously.",
    "Netflix and avoid social responsibilities.",
    "Just here for the WiFi.",
    "Procrastination level: Expert mode activated.",
    "Running late? Call it fashionably.",
    "Brain says gym, body naps.",
    "When pizza becomes your soulmate.",
    "Adulting: why does it exist?",
    "Wifi down, sanity left town.",
    "Diet starts tomorrow, promise seriously.",
    "Mondays should come with warnings.",
    "Living life on airplane mode.",
    "Accidentally adulting like a pro.",
    "Weekends need a day extension.",
    "Sleep deprived but still thriving.",
    "Caffeine: my one true love.",
    "Unexpected guests? Hide the mess!",
    "Life goal: nap like cat.",
    "Sarcasm: my favorite coping mechanism."
]

function getMeme() {
    return gMeme
}

function createMeme(elImage) {
    const img = _createImg(gId, elImage.src, [])
    gImgs.push(img)

    const meme = {
        selectedImgId: img.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 40,
                color: { stroke: 'red', fill: 'white' },
                pos: { x: 50, y: 50 },
                align: 'left',
                fontFamily: 'Impact'
            }
        ]
    }
    gMeme = meme
    return meme
}

function drawImg(imgId) {
    const newImage = new Image()
    img = gImgs.find(img => img.id === imgId)
    newImage.src = img.url
    coverCanvasWithImg(newImage)
    gSelectedImage = newImage
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function setLineTxt(txt) {
    const meme = getMeme()

    const line = meme.lines[gCurrLine]

    line.txt = txt
}

function setFillColor(elColor) {

    gMeme.lines[gCurrLine].color.fill = elColor
}

function setStrokeColor(elColor) {
    gMeme.lines[gCurrLine].color.stroke = elColor
}

function changeFontSize(operator) {
    if (operator === '+') gMeme.lines[gCurrLine].size++
    if (operator === '-') gMeme.lines[gCurrLine].size--

}

function addLine() {
    gCurrLine = gMeme.lines.length
    gMeme.lines[gCurrLine] = {
        txt: '',
        size: 40,
        color: { stroke: 'red', fill: 'white' },
        fontFamily: 'Impact',
        pos: { x: 50, y: gMeme.lines[gCurrLine - 1].pos.y + 50 }
    }

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

function drawText(text, x, y, fontSize, color, align = 'center', fontFamily = 'Impacta') {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color.stroke
    gCtx.fillStyle = color.fill
    gCtx.font = `${fontSize}px ${fontFamily}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getLine() {
    return gMeme.lines[gCurrLine]
}

function isLineClicked(clickedPos) {
    for (var i = 0; i < gMeme.lines.length; i++) {

        const line = gMeme.lines[i];
        const { x, y } = line.pos;
        const height = line.size;

        if (clickedPos.x >= x && clickedPos.x <= x + gCtx.measureText(line.txt).width &&
            clickedPos.y >= y - height && clickedPos.y <= y) {
            gCurrLine = i;
            updateEditor()
            return true;
        }
    }
    return false;
}

function setLineDrag(isDrag) {
    const line = getLine()
    line.isDrag = isDrag
}

function moveLine(dx, dy) {
    const line = getLine()
    line.pos.x += dx
    line.pos.y += dy
}

function alignText(direction) {
    const line = getLine()
    line.align = direction

}

function deleteLine() {
    const line = getLine()
    line.txt = ' '
    renderMeme()
    updateEditor()
}

function setFont(elFont) {
    const line = getLine()
    line.fontFamily = elFont
    renderMeme()
    updateEditor()

}

function randomMeme() {


    const imgIdx = getRandomIntInclusive(0, gGalleryImgs.length - 1)
    const sentenceIdx = getRandomIntInclusive(0, funnySentences.length - 1)
    const img = gGalleryImgs[imgIdx]
    const sentence = funnySentences[sentenceIdx]
    const newImg = _createImg(img.id, img.url, img.keywords)
    gImgs.push(newImg)


    const meme = {
        selectedImgId: img.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: `${sentence}`,
                size: 40,
                color: { stroke: 'red', fill: 'white' },
                pos: { x: 50, y: 50 },
                align: 'left',
                fontFamily: 'Impact'
            }
        ]
    }
    gMeme = meme
    return meme

}