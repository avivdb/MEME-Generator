function onInitGallery() {

    createGallery()
    renderGallery()

}

function renderGallery() {

    const imgs = getImgs()
    const galleryHtml = imgs.map(img => `<img onclick="onSelectImage(this)" src="${img.url}" alt="">`).join('')
    var elGallery = document.querySelector('.image-container')
    elGallery.innerHTML = galleryHtml

}

function onSelectImage(elImage) {

    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')

    createMeme(elImage)
    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')

    renderMeme()

}

function onShowGallery() {

    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}

function onFilterGallery(elKeyword) {

    filterBy = elKeyword
    renderGallery()

}

function renderWordCloud() {

}