
function renderGallery() {

    var strHtml = ''

    for (let i = 1; i <= 18; i++) {
        strHtml += `<img onclick="onSelectImage(this)" src="img/${i}.jpg" alt="">`
    }

    var elGallery = document.querySelector('.image-container')
    elGallery.innerHTML = strHtml
}