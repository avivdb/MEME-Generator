function onInitGallery() {

    createGallery()
    renderGallery()
    renderWordCloud()

}

function renderGallery() {

    const imgs = getImgs()
    const galleryHtml = imgs.map(img => `<img onclick="onSelectImage(this)" src="${img.url}" alt="">`).join('')
    var elGallery = document.querySelector('.image-container')
    elGallery.innerHTML = galleryHtml

}

function onSelectImage(elImage) {

    onShowEditor()
    createMeme(elImage)
    renderMeme()

}

function onShowGallery() {

    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
    onResetGallery()
}

function onFilterGallery(elKeyword) {

    filterBy = elKeyword
    renderGallery()

}

function renderWordCloud() {
    var strHtml = ''
    const words = gKeywords.flat()
    let max = 0
    for (var i = 0; i < 10; i++) {

        const word = words[getRandomIntInclusive(0, words.length - 1)]
        let factor = gKeywordSearchCountMap[word]

        factor *= 3
        factor += 20

        strHtml += `<span onclick="onSearchWord(this.innerHTML)" style="font-size: ${factor}px;">${word}</span>`
        factor = 0
    }

    const elCloud = document.querySelector('.words-cloud')
    elCloud.innerHTML = strHtml

}

function onSearchWord(elWord) {
    filterBy = elWord
    renderGallery()
}

function onResetGallery() {
    filterBy = ''
    onClearSearch()
    renderGallery()
}

function onClearSearch() {
    var elInput = document.querySelector('.search-bar-input')
    elInput.value = ''
}

function onShowEditor() {
    const elGallery = document.querySelector('.image-gallery')
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
}