const Error = ({ message }) => {
    return message ? 
        <p className='error'>{message}</p> : <></>
}

export default Error