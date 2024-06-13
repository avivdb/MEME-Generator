

function onInit() {
    renderGallery()
}

function renderGallery() {

    var strHtml = ''

    for (let i = 1; i <= 18; i++) {
        strHtml += `<img src="meme-imgs/meme-imgs (square)/${i}.jpg" alt="">`
    }

    var elGallery = document.querySelector('.image-gallery')
    elGallery.innerHTML = strHtml
}