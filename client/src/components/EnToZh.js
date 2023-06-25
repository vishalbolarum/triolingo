import { useEffect, useState } from 'react'
import { textToSpeech, splitZhSentence } from '../util'
import { useSelector } from 'react-redux'

const EnToZh = ({ word, nextQuestion }) => {

    const dictionary = useSelector(state => state.dictionary)
    const { sentence } = word

    const [selection, setSelection] = useState([])
    const [choice, setChoice] = useState([])
    const [result, setResult] = useState({
        display: false, // Should we display the result?
        correct: false // Did they get the answer right or wrong?
    })

    // Add a word to the selection & remove it from the choices. [NEEDS FIXING]
    const addWord = (item, index) => {
        setSelection(prev => [...prev, item])
        setChoice(prev => {
            prev.splice(index, 1)
            return prev
        })
        textToSpeech(item)
    }

    // Remove a word from the selection & add it the choice. [NEEDS FIXING]
    const removeWord = (item, index) => {
        setSelection(prev => {
            prev.splice(index, 1)
            return prev
        })
        setChoice(prev => [...prev, item])
    }

    const checkAnswer = e => {
        const correct = selection.join('') === sentence.zh.replace(/[？，。！“”]/g, '') // Compare user's input & original zh with punctuation + spaces removed.
        setResult({
            display: true,
            correct
        })
        textToSpeech(sentence.zh)
    }

    useEffect(() => {

        // 1. Convert Hanzi sentence string into randomised array of objects.
        setChoice(
            splitZhSentence(
                sentence.zh.replace(/[？，。！“”]/g, ''), dictionary) // Remove ？，。 characters from the string then convert this string into an array of phrases.
                .sort((a, b) => 0.5 - Math.random()) // Shuffle the order.
        )

    }, [])

    return (
        <div>

            <section>
                <h1>Translate the sentence.</h1>
                <h2>
                    <p className='en'>{sentence.en}</p>
                </h2>
            </section>

            <section className='translation'>
                <div>
                    {selection.map((item, index) =>
                        <div onClick={() => removeWord(item, index)} className='zh word'>
                            <p>{item}</p>
                        </div>
                    )}
                </div>
            </section>

            <section className='choice'>
                {choice.map((item, index) =>
                    <div onClick={() => addWord(item, index)} className='zh word'>
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
                        <p>Solution: {sentence.zh}</p>
                    </div>
                    <button onClick={nextQuestion}>Next</button>
                </section>
            }

        </div>
    )
}

export default EnToZh