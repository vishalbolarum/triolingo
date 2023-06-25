// This document contains functions that are used repeatedly.
export const textToSpeech = (text, rate = 1, lang = 'zh-CN') => { // Default playback rate is 1 and language is Mandarin.
    const msg = new SpeechSynthesisUtterance(text)
    msg.lang = lang
    msg.rate = rate
    window.speechSynthesis.cancel() // In order to work on Chrome.
    window.speechSynthesis.speak(msg)
}

export const splitZhSentence = (str, dictionary) => {
    let i = 0
    const arr = []
    while (i < str.length) {
        if (dictionary[str[i] + str[i + 1] + str[i + 2]]) { // If there is a key (Chinese word) in the data that matches these 3 characters combined...
            arr.push(str[i] + str[i + 1] + str[i + 2]) // Push this to the array.
            i += 3 // Add 3 to the index since we're already pushed the first t
        } else if (dictionary[str[i] + str[i + 1]]) { // If not, check if there is a key (Chinese word) that matches the first 2 characters.
            arr.push(str[i] + str[i + 1])
            i += 2
        } else {
            arr.push(str[i])
            i++
        }
    }
    return arr
}