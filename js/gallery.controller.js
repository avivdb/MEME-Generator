
function renderGallery() {

    var strHtml = ''

    for (let i = 1; i <= 18; i++) {
        strHtml += `<img onclick="onSelectImage(this)" src="img/${i}.jpg" alt="">`
    }

    var elGallery = document.querySelector('.image-container')
    elGallery.innerHTML = strHtml
}

function onSelectImage(elImage) {
    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')

    createMeme(elImage)
    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')

    renderMeme()
    // updateEditor()
}



function onShowGallery() {
    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}