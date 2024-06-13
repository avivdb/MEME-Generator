
var gFontSize = 40
var gFontFamily = 'Ariel'
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
                color: { stroke: 'black', fill: 'black' }
            },
            {
                txt: '',
                size: 40,
                color: { stroke: 'black', fill: 'black' }
            }
        ]
    }
    gMeme = meme
    console.log('meme:', meme);
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


function setLineTxt(txt, selectedLineIdx) {
    const meme = getMeme()
    console.log('meme:', meme);
    const lines = meme.lines[selectedLineIdx]
    console.log('lines:', lines);
    lines.txt = txt
}
function drawText(text, x, y, fontSize, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color.stroke
    gCtx.fillStyle = color.fill
    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
function setFillColor(elColor, selectedLineIdx) {

    gMeme.lines[selectedLineIdx].color.fill = elColor
}

function setStrokeColor(elColor, selectedLineIdx) {
    gMeme.lines[selectedLineIdx].color.stroke = elColor
}
function changeFontSize(operator, selectedLineIdx) {
    if (operator === '+') gMeme.lines[selectedLineIdx].size++
    if (operator === '-') gMeme.lines[selectedLineIdx].size--

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

