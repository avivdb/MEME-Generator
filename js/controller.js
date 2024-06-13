var gElCanvas
var gCtx
var gSelectedImage
function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderGallery() {

    var strHtml = ''

    for (let i = 1; i <= 18; i++) {
        strHtml += `<img onclick="onSelectImage(this)" src="img/${i}.jpg" alt="">`
    }

    var elGallery = document.querySelector('.image-container')
    elGallery.innerHTML = strHtml
}

function onSelectImage(elImage) {
    const image = new Image()
    image.src = elImage.src
    gSelectedImage = image
    coverCanvasWithImg(image)
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onTypeText(elText) {
    console.log('elText:', elText);
    coverCanvasWithImg(gSelectedImage)
    drawText(elText, 50, 50)
}

function onFillColor(elColor) {
    gFillColor = elColor
}
function onStrokeColor(elColor) {
    gStrokeColor = elColor
}
function onChangeFontSize(operator) {
    changeFontSize(operator)
}

function renderMeme() {
    const meme = getMeme()
    const img = getImg()
    console.log('meme:', meme);
    const image = new Image()
    const imgId = meme.selectedImgId
    console.log('imgId:', imgId);
    iMMg = gImgs.find(img => img.id === imgId)
    console.log('iMMg:', iMMg);
    console.log('image:', image);
}