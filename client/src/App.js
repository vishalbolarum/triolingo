import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ZhToEn from './components/ZhToEn'
import EnToZh from './components/EnToZh'
import Loading from './components/Loading/Loading'
import axios from 'axios'
import { load } from './features/dictionary/dictionary'

const App = () => {

  const dispatch = useDispatch()

  const [word, setWord] = useState() // This is the original sentence data.
  const [activeRecall, setActiveRecall] = useState(false)

  const fetchDictionary = async () => {
    const { data } = await axios.get('/dictionary')
    dispatch(load(data))
  }

  const nextQuestion = async () => {
    setWord(undefined)
    const { data } = await axios.get('/randomWord')
    setWord(data)
    setActiveRecall(prev => !prev) // Switch the question type.
  }

  useEffect(() => {

    (async () => {

      await fetchDictionary()

      await nextQuestion()

    })()

  }, [])

  return !word ? <Loading/> : (
    activeRecall ? <EnToZh word={word} nextQuestion={nextQuestion} />
    : <ZhToEn word={word} nextQuestion={nextQuestion} />
  )
}

export default App