const input = document.getElementsByTagName('input')[0]
input.focus()
const bits = new Array(64).fill(0)

input.addEventListener('input', e => {
    handler()
    for (let i = 0; i < bits.length; i ++) {
        document.getElementsByClassName('square')[i].innerText = bits[i]
    }
})


function handler() {
    let bytes = new Uint8Array(8)
    let memory = new Float64Array(bytes.buffer)
    memory[0] = input.value
    for (let i = 0; i < 8; i ++) {
        let byte = bytes[i]
        for (let j = 0; j < 8; j ++) {
            bits[(8 - i) * 8 - j - 1] = byte & 1
            byte = byte >> 1
        }
    }
}
handler()
const fragment = new DocumentFragment
for (let i = 0; i < bits.length; i ++) {
    let span = document.createElement('span')
    if (i === 0) span.classList.add('sign')
    else if (i > 0 && i <= 11) span.classList.add('exponent')
    else if (i > 11) span.classList.add('fraction')
    span.classList.add('square')
    span.innerText = bits[i]
    fragment.append(span)
}

const container = document.getElementsByClassName('container')[0]
container.append(fragment)
const range = new Range
range.setStart(container, 12)
range.setEnd(container, 12)
const span = document.createElement('span')
span.innerText = '1.'
span.classList.add('grey')
range.insertNode(span)

range.setStart(container, 33)
range.setEnd(container, 33)
const element = document.createElement('br')
range.insertNode(element)
