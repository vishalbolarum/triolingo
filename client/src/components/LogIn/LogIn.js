import './LogIn.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import Error from '../Error/Error'

const LogIn = () => {

    const navigate = useNavigate()
    const [error, setError] = useState()

    const addAPIKey = async e => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        try {
            await axios.post('/logIn', data)
            navigate('/practice')
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <div className='log-in-page'>
            <form onSubmit={addAPIKey}>
                <Error message={error}/>
                <label>OpenAI API Key</label>
                <p className='disclaimer'>Your API key will be encrypted and stored in your session data. We do not store it in our database.</p>
                <input name='apiKey' placeholder='e.g. sk-H3498YW8Q4Y3A9SDFY0' type='password' required/>

                <div className='button-container'>
                    <button type='submit'>Proceed</button>
                </div>
            </form>
            
        </div>
    )
}

export default LogIn