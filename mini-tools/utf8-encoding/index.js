const wrapper = document.getElementsByClassName('wrapper')[0]
input.focus()
input.addEventListener('input', debounce(() => {
    wrapper.innerHTML = ""
    const { result, encoding } = utf8Encoding(input.value)
    handler(result, encoding, input.value)
}, 800))

function debounce(fn, delay) {
    let timer = null
    return function() {
        const _this = this
        const args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(_this, args)
        }, delay)
    }
}

function handler(result, encoding, value) {
    let bufferIndex = 0
    for (let i = 0; i < result.length; i ++) {
        const bytes = result[i].length
        const buffer = document.createElement('div')
        buffer.classList.add('buffer')
        const char = document.createElement('span')
        char.classList.add('character')
        char.innerText = value[i]
        const textNode = document.createTextNode('：')
        const fragment = new DocumentFragment
        fragment.append(char)
        fragment.append(textNode)
        buffer.append(fragment)
        const highOrderBits = {
            1: [0],
            2: [110, 10],
            3: [1110, 10, 10],
            4: [11110, 10, 10, 10]
        }
        for (let r = 0; r < bytes; r ++) {
            const byte = document.createElement('div')
            const codePoint = document.createElement('span')
            codePoint.classList.add('codePoint')
            codePoint.innerText = encoding[bufferIndex ++]
            byte.classList.add('byte')
            byte.append(codePoint)
            for (let k = 0; k < 8; k ++) {
                const span = document.createElement('span')
                if (k < highOrderBits[bytes][r] .toString().length)
                    span.classList.add('high')
                byte.append(span)
            }
            fragment.append(byte)
        }
        buffer.append(fragment)
        const bytesList = buffer.getElementsByClassName('byte')
        for (let j = 0; j < bytes; j ++) {
            const bits = result[i][j].slice(2)
            for (let index = 0; index < bits.length; index ++) {
                bytesList[j].children[index + 1].innerText = bits[index]
            }
        }
        wrapper.append(buffer)
    }
}
