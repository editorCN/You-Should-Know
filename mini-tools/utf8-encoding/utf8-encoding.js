function utf8Encoding(string) {
    const result = [], cache = []
    let bufferIndex = 0
    const chars = string.split('')
    const length = chars.length
    const highOrderBits = {
        1: [0],
        2: [110, 10],
        3: [1110, 10, 10],
        4: [11110, 10, 10, 10]
    }
    const UTF8_1_xBits_Max_Length = 7
    const UTF8_2_xBits_Max_Length = 11
    const UTF8_3_xBits_Max_Length = 16
    const UTF8_4_xBits_Max_Length = 21
    for (let i = 0; i < length; i ++) {
        let byte,
            xBitsStartIndex = 0,
            bits = chars[i].codePointAt(0).toString(2)
        const bitsLength = bits.length, bytesBuffer = []
        // fill x bits
        if (bitsLength <= UTF8_1_xBits_Max_Length) {
            byte = 1
            bits = `${new Array(UTF8_1_xBits_Max_Length - bitsLength + 1).join(0)}${bits}`
        } else if (bitsLength > UTF8_1_xBits_Max_Length && bitsLength <= UTF8_2_xBits_Max_Length) {
            byte = 2
            bits = `${new Array(UTF8_2_xBits_Max_Length - bitsLength + 1).join(0)}${bits}`
        } else if (bitsLength > UTF8_2_xBits_Max_Length && bitsLength <= UTF8_3_xBits_Max_Length) {
            byte = 3
            bits = `${new Array(UTF8_3_xBits_Max_Length - bitsLength + 1).join(0)}${bits}`
        } else if (bitsLength > UTF8_3_xBits_Max_Length && bitsLength <= UTF8_4_xBits_Max_Length) {
            byte = 4
            bits = `${new Array(UTF8_4_xBits_Max_Length - bitsLength + 1).join(0)}${bits}`
        }
        Object.keys(highOrderBits[byte]).map(index => {
            // 1 byte = 8 bits
            bufferIndex ++
            const xBitsLength = 8 - highOrderBits[byte][index] .toString().length
            bytesBuffer.push(`0b${highOrderBits[byte][index] + bits.slice(xBitsStartIndex, xBitsStartIndex + xBitsLength)}`)
            xBitsStartIndex += xBitsLength
        })
        cache.push(bytesBuffer.slice())
        result.push(bytesBuffer)
    }
    const buffer = new ArrayBuffer(bufferIndex)
    const encoding = new Uint8Array(buffer)
    while (bufferIndex) {
        if (!cache[cache.length - 1].length) cache.pop()
        encoding[-- bufferIndex] = cache[cache.length - 1].pop()
    }
    return {
        encoding,
        result
    }
}
