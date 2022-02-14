numberRandom = (max, min) => Math.floor(Math.random() * (max - min)) + min
generateString = (size = 1, vocal = false) => {
    size = (size !== undefined && size > 0) ? size : 1
    let result = ""
    const alphabet = ["aeiou", "bcdfghjklmnpqrstvwxyz"]
    while (result.length < size) {
        const statusVocal = (vocal) ? 0 : 1
        result += alphabet[statusVocal][Math.floor(Math.random() * alphabet[statusVocal].length)]
    }
    return result
}

makeWord = (setNumber = false) => {
    return "" +
        generateString(1, false) +
        generateString(1, true) +
        generateString(2, false) +
        generateString(1, true) +
        ((setNumber)
            ? String(numberRandom(9, 0))
            : generateString(1, false)
        )
}

function generatePassAppleId(groupWords = 1, positionNumber = null) {
    groupWords = (groupWords !== undefined && groupWords > 0) ? groupWords : 1
    let result = Array(groupWords)
        .fill()
        .map( (_, index) => makeWord(positionNumber === index) )
    return result.join("-")
}

document.getElementById("generate_pass").addEventListener("click", (e) => {
    e.preventDefault()
    const group = 3
    // const getNumber = (numberRandom(1, 0)) ? numberRandom(group - 1,0) : null
    document.getElementById("generated_text").value = generatePassAppleId(group, numberRandom(group - 1,0))
})