'use strict'

function saveToStorage(key, value) {
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)

}
function loadFromStorage(key) {
    const valueStr = localStorage.getItem(key)
    return JSON.parse(valueStr)
}