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
        strHtml += `<img onclick="onSelectImage(this)" src="meme-imgs/meme-imgs (square)/${i}.jpg" alt="">`
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
    // console.log('dataUrl:', dataUrl)
    elLink.href = dataUrl
    // Set a name for the downloaded file
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