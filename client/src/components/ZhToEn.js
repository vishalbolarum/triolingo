import { useEffect, useState } from 'react'
import { textToSpeech, splitZhSentence } from '../util'
import { useSelector } from 'react-redux'

const ZhToEn = ({ word, nextQuestion }) => { // Destructuring the raw sentence object to be used.

    const dictionary = useSelector(state => state.dictionary)
    const { sentence } = word

    const [zh, setZh] = useState([/*{ hanzi: '', pinyin: '' }*/])
    const [selection, setSelection] = useState([])
    const [choice, setChoice] = useState(word.sentence.en.match(/\w+(?:'\w+)*/g).sort((a, b) => 0.5 - Math.random())) // Convert the English translation to an shuffled array of words.
    const [result, setResult] = useState({
        display: false, // Should we display the result?
        correct: false // Did they get the answer right or wrong?
    })

    // Add a word to the selection & remove it from the choices.
    const addWord = (item, i) => {
        setSelection(prev => [...prev, item])
        setChoice(prev => {
            prev.splice(i, 1)
            return prev
        })
    }

    // Remove a word from the selection & add it the choice.
    const removeWord = (item, i) => {
        setSelection(prev => {
            prev.splice(i, 1)
            return prev
        })
        setChoice(prev => [...prev, item])
    }

    // Check the user's answer.
    const checkAnswer = e => {
        const correct = JSON.stringify(selection) === JSON.stringify(sentence.en.match(/\w+(?:'\w+)*/g)) // Compare user input with English translation.
        setResult({
            display: true,
            correct
        })
    }

    useEffect(() => {

        // 1. Convert original zh string into array of objects with hanzi and pinyin.
        setZh(splitZhSentence(sentence.zh, dictionary))

        // 2. Play the audio.
        textToSpeech(sentence.zh)

    }, [])

    return (
        <div>

            <section>
                <h1>Translate the sentence.</h1>
                <h2>
                    {zh.map(item =>
                        <span onMouseOver={() => textToSpeech(item)} className='zh'>{item}</span>
                    )}
                </h2>
            </section>

            <section className='audio'>
                <button onClick={() => textToSpeech(sentence.zh)}>🔉</button>
                <button onClick={() => textToSpeech(sentence.zh, 0.5)}>🐢</button>
            </section>

            <section className='translation'>
                <div>
                    {selection.map((item, i) =>
                        <div onClick={() => removeWord(item, i)} className='en word'>
                            <p>{item}</p>
                        </div>
                    )}
                </div>
            </section>

            <section className='choice'>
                {choice.map((item, i) =>
                    <div onClick={() => addWord(item, i)} className='en word'>
                        <p>{item}</p>
                    </div>
                )}
            </section>

            {!result.display &&
                <section className='options'>
                    <button onClick={nextQuestion}>Skip</button>
                    <button onClick={checkAnswer}>Check</button>
                </section>
            }

            {result.display &&
                <section className={result.correct ? 'correct' : 'incorrect'}>
                    <div>
                        <h2>{result.correct ? 'Correct!' : 'Incorrect!'}</h2>
                        <p>Solution: {sentence.en}</p>
                    </div>
                    <button onClick={nextQuestion}>Next</button>
                </section>
            }

        </div>
    )
}

export default ZhToEn