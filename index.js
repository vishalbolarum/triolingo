require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { Configuration, OpenAIApi } = require('openai')
const words = require('./data.js')

const app = express()
app.use(cors())
app.set('trust proxy', 1)
app.use(session({
    secret: 'yikes',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// [ROUTE] verifies whether the OpenAI API key provided by the user is real and stores it in the session if it is.
app.post('/logIn', async (req, res) => {
    const { apiKey } = req.body
    const openai = new OpenAIApi(new Configuration({
        apiKey
    }))
    try {
        await openai.listEngines()
        req.session.apiKey = apiKey
        res.sendStatus(200)
    } catch(e) {
        res.status(400).send('API key is invalid.')
    }
})

// [ROUTE] checks whether the user has the OpenAI API key stored in their session.
app.get('/isLoggedIn', async (req, res) => {
    if (req.session.apiKey) {
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }
})

// [ROUTE] returns a random word object provided there's an OpenAI API key stored in the session.
app.get('/randomWord', async (req, res) => {
    const randomWord = words[Math.floor(Math.random()*words.length)]
    try { 
        const openai = new OpenAIApi(new Configuration({ apiKey: req.session.apiKey }))
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "user",
                    content: `Generate a tricky sentence including '${randomWord.zh}'. Return the response as JSON with key zh and en.`
                }
            ]
        })
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

// [ROUTE] Dictionary endpoint. Converts words array into an object with keys for different Chinese words. [{ zh: '爱', en: 'love' }, { zh: '爱好', en: 'hobby' }] → { 爱: 'love', 爱好: 'hobby' }
app.get('/dictionary', async (req, res) => {
    const dictionary = {}
    words.forEach(item => {
        dictionary[item.zh] = item.en
    })
    res.json(dictionary)
})

app.use(express.static('client/build'))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})
app.listen(process.env.PORT || 4000)