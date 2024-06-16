var gGalleryImgs = []
var filterBy

const gKeywords = [

    ["angry", "man", "speech", "microphone", "gesture"],
    ["puppies", "kissing", "cute", "dog", "furry"],
    ["baby", "puppy", "sleeping", "white", "dog"],
    ["cat", "sleeping", "keyboard", "cute", "computer"],
    ["determined", "baby", "beach", "funny", "cute"],
    ["man", "talking", "hair", "suit", "gesture"],
    ["surprised", "baby", "big eyes", "striped", "cute"],
    ["man", "hat", "smiling", "purple", "bow tie"],
    ["happy", "baby", "lawn", "smiling", "plaid"],
    ["smiling", "man", "close-up", "wrinkles", "teeth"],
    ["basketball", "players", "intense", "face-to-face", "competition"],
    ["pointing", "man", "glasses", "beard", "smiling"],
    ["toast", "man", "drink", "smirk", "formal"],
    ["sunglasses", "man", "reflection", "bald", "serious"],
    ["gesture", "man", "beard", "smirking", "brown hair"],
    ["laughing", "man", "facepalm", "uniform", "star trek"],
    ["speaking", "man", "suit", "gesture", "serious"],
    ["toys", "buzz lightyear", "woody", "animated", "pointing"]

]

var gKeywordSearchCountMap

function getImgs() {

    if (filterBy === undefined || filterBy === '') return gGalleryImgs
    const filteredImgs = gGalleryImgs.filter(img => img.keywords.map(key => key.toUpperCase()).includes(filterBy.toUpperCase()))
    return filteredImgs

}

function createImg(url, keywords = []) {

    return image = {
        id: makeId(),
        url,
        keywords

    }
}

function createGallery() {
    for (let i = 1; i <= 18; i++) {
        const img = createImg(`img/${i}.jpg`, gKeywords[i - 1])

        gGalleryImgs.push(img)
    }
    return
}

function createWordCloud() {

    gKeywordSearchCountMap = gKeywords.flat().reduce((map, word) => {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});



}