import React, { useState } from 'react';

interface UpdateStatusProps {
    updateStatus: (status: string) => void;
}

function NewStatus({updateStatus}: UpdateStatusProps): JSX.Element {
    const [status, setStatus] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(status);
        
        if(!status) return;
        updateStatus(status);
        setStatus('');
    }


    return (
        <form onSubmit={submitForm}>
            <label htmlFor="username"></label>
                <input value={status} placeholder="update status" onChange={e => setStatus(e.target.value)} id='status' type='text' className='form-control' />
                <button className='btn btn-outline-secondary my-3' type='submit'>update status</button>
        </form>
    )
}

export default NewStatus;