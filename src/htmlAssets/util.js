function createH1(text) {
    const h1 = document.createElement('h1');
    h1.innerText = text
    return h1
}

function createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(`${className}`)
    return div
}

function createLabel(labelPurpose) {
    const label = document.createElement('label');
    label.setAttribute('for', `${labelPurpose}`)
    return label
}

function createInput(type, id, name, value, min = null, max = null) {
    const input = document.createElement('input');
    input.setAttribute("type", `${type}`)
    input.setAttribute("id", `${id}`)
    input.setAttribute("name", `${name}`)
    input.setAttribute("value", `${value}`)
    if (min !== null && max !== null) {
    input.setAttribute("min", `${min}`)
    input.setAttribute("max", `${max}`)
    }
    return input
}

export {createH1, createDiv, createLabel, createInput}