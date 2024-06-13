var gElCanvas
var gCtx

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
    coverCanvasWithImg(image)
}

