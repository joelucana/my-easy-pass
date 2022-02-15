numberRandom = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min
pushElement = (array, value, index) => array.slice(0, index).concat(value, array.slice(index))

setUpperCase = (word) => {
    const indexNumber = word.indexOf(word.match(/\d/)) // Detect only 1st position number
    const valueNumber = word[indexNumber]
    let arrayChar_i = [], arrayChar_o = []
    let wordArray = word
        .split("")
        .filter((char, index) => index !== indexNumber)
        .filter((char, index) => {
            if(char === "i") arrayChar_i.push(index)
            return char !== "i"
        })
        .filter((char, index) => {
            if(char === "o") arrayChar_o.push(index)
            return char !== "o"
        })
    const upperCaseIndex = numberRandom(wordArray.length - 1, 0)
    wordArray = wordArray
        .map((char, index) => upperCaseIndex === index
            ? char.toUpperCase()
            : char
        )
    arrayChar_i.forEach(position => { wordArray = pushElement(wordArray, "i", position) })
    arrayChar_o.forEach(position => { wordArray = pushElement(wordArray, "o", position) })
    return ((indexNumber !== -1)
            ? pushElement(wordArray, valueNumber, indexNumber)
            : wordArray
        ).join("")
}

generateChars = (size = 1, vocal = false) => {
    size = (size !== undefined && size > 0) ? size : 1
    let result = ""
    const alphabet = ["aeiouy", "bcdfghjkmnpqrstvwxz"]
    while (result.length < size) {
        const statusVocal = (vocal) ? 0 : 1
        result += alphabet[statusVocal][Math.floor(Math.random() * alphabet[statusVocal].length)]
    }
    return result
}

makeWord = (setNumber = false) => {
    return "" +
        generateChars(1, false) +
        generateChars(1, true) +
        generateChars(2, false) +
        generateChars(1, true) +
        ( (setNumber)
            ? String(numberRandom(9, 1))
            : generateChars(1, false)
        )
}

generatePass = (groupWords = 1) => {
    groupWords = (groupWords !== undefined && groupWords > 0) ? groupWords : 1
    const positionNumber = numberRandom(groupWords - 1,0)
    const positionUpperCase = numberRandom(groupWords - 1,0)
    let result = Array(groupWords)
        .fill(undefined)
        .map( (_, index) => makeWord(positionNumber === index) )
        .map( (word, index) => positionUpperCase === index
            ? setUpperCase(word)
            : word
        )
    return result.join("-")
}

document.getElementById("generate_pass").addEventListener("click", (e) => {
    e.preventDefault()
    const group = 3
    document.getElementById("generated_text").value = generatePass(group)
})