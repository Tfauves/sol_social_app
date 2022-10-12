import React, { useState } from 'react';

interface SignupProps {
    signupUsername: (username: string) => void;
    // signupStatus: (status: string) => void;
}

function Signup({signupUsername}: SignupProps): JSX.Element {
    const [username, setUsername] = useState('');
    // const [status, setStatus] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if(!username) return;
        // if(!status) return;
        signupUsername(username);
        // signupStatus(status);
        setUsername('');
        // setStatus('');
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor='username'></label>
                <input value={username} placeholder='username' onChange={e => setUsername(e.target.value)} id='username' type='text' className='form-control' />
            {/* <label htmlFor='status'></label>
                <input value={status} placeholder='status' onChange={e => setStatus(e.target.value)} id='status' type='text' className='form-control' /> */}
                <button className='btn btn-outline-secondary my-3' type='submit'>Sign Up</button>
        </form>
    )
}

export default Signup;