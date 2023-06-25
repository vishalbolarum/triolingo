require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const words = require('./data.js')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// [START] OPENAI
const { Configuration, OpenAIApi } = require('openai')
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI
}))

app.get('/randomWord', async (req, res) => {

    const randomWord = words[Math.floor(Math.random()*words.length)]

    // const response = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         {
    //             role: "user",
    //             content: `Generate a tricky sentence including '${randomWord.zh}'. Return the response as JSON with key zh and en.`
    //         }
    //     ]
    // })
    
    try { 
        const sentence = JSON.parse(response.data.choices[0].message.content)
        randomWord.sentence = sentence
    } catch (e) {
        randomWord.sentence = {
            zh: '他是八年级的学生，已经展现出了惊人的才华和成就。',
            en: 'He is an eighth-grade student who has already shown remarkable talent and achievements.'
        }
    }

    res.json(randomWord) // EXAMPLE RESPONSE: { zh: '', en: '', sentence: { zh: '', en: '' } }

})

// Dictionary endpoint. Converts words array into an object with keys for different Chinese words. [{ zh: '爱', en: 'love' }, { zh: '爱好', en: 'hobby' }] → { 爱: 'love', 爱好: 'hobby' }
app.get('/dictionary', async (req, res) => {
    const dictionary = {}

    words.forEach(item => {
        dictionary[item.zh] = item.en
    })

    res.json(dictionary)
})

// If in production, serve the client's build folder.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

app.listen(process.env.PORT || 4000)