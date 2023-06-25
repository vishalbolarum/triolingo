import './LogIn.css'

const LogIn = () => {

    const addAPIKey = async e => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        // TO BE CONTINUED
    }

    return (
        <div className='log-in-page'>
            <form onSubmit={addAPIKey}>
                <label>OpenAI API Key</label>
                <p className='disclaimer'>Your API key will be encrypted and stored in your session data. We do not store it in our database.</p>
                <input name='api_key' placeholder='e.g. sk-H3498YW8Q4Y3A9SDFY0' type='password' required/>

                <div className='button-container'>
                    <button type='submit'>Proceed</button>
                </div>
            </form>
            
        </div>
    )
}

export default LogIn