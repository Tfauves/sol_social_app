import React, { useState } from 'react';

interface DisplayInfoProps {
    getDetails: (username: string ) => void;
}

function Display({getDetails}: DisplayInfoProps): JSX.Element {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    return (
        <div>
      <h1>{username}</h1>
      <h1>{status}</h1>
        </div>
    )
}

export default Display;