import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ZhToEn from '../ZhToEn'
import EnToZh from '../EnToZh'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { load } from '../../features/dictionary/dictionary'

const Practice = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

      try {
        await axios.get('/isLoggedIn')
        await fetchDictionary()
        await nextQuestion()
      } catch(e) {
        navigate('/logIn')
      }

    })()

  }, [])

  return !word ? <Loading/> : (
    activeRecall ? <EnToZh word={word} nextQuestion={nextQuestion} />
    : <ZhToEn word={word} nextQuestion={nextQuestion} />
  )
}

export default Practice