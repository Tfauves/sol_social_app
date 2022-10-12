import React, {useState} from 'react';

interface NewUsernameProps {
    updateUsername: (username: string) => void;
}

function NewUsername({updateUsername}: NewUsernameProps): JSX.Element {
    const [username, setUsername] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(username);
        if(!username) return;
        updateUsername(username);
        setUsername('');
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="username"></label>
                <input value={username} placeholder="new username" onChange={e => setUsername(e.target.value)} id='username' type='text' className='form-control' />
                <button className='btn btn-outline-secondary my-3' type='submit'>update username</button>
        </form>
    )
}
export default NewUsername;