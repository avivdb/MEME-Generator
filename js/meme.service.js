
var gFontSize = 40
var gFontFamily = 'Ariel'
var gId = 1
var gImgs = _createImgs()
var gCurrLine = 0
var gLine

// var gMeme = {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'I sometimes eat Falafel',
//             size: 20,
//             color: 'red'
//         }
//     ]
// }

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}
function createMeme(elImage) {
    console.log('elImage:', elImage);
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
    console.log('meme:', meme);
    return meme
}

function drawImg(imgId) {
    const newImage = new Image()
    img = gImgs.find(img => img.id === imgId)
    console.log('img:', img);
    newImage.src = img.url
    console.log('newImage:', newImage);
    coverCanvasWithImg(newImage)
    gSelectedImage = newImage
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function setLineTxt(txt) {
    const meme = getMeme()
    // console.log('meme:', meme);
    const line = meme.lines[gCurrLine]
    // console.log('line:', line);
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
    console.log('gCurrLine:', gCurrLine);
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
        // const { pos } = gMeme.lines[i].pos
        const line = gMeme.lines[i];
        const { x, y } = line.pos;
        const height = line.size;

        if (clickedPos.x >= x && clickedPos.x <= x + gCtx.measureText(line.txt).width &&
            clickedPos.y >= y - height && clickedPos.y <= y) {
            gCurrLine = i;  // set the current line to the clicked line
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

//* Move the Line in a delta, diff from the pervious pos
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
    console.log('line:', line);
    console.log('line.txt:', line.txt);
    line.txt = ' '
    console.log('line.txt:', line.txt);
    renderMeme()
    updateEditor()
}

function setFont(elFont) {
    const line = getLine()
    line.fontFamily = elFont
    renderMeme()
    updateEditor()

}