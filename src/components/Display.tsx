import React, { useState } from 'react';

interface DisplayInfoProps {
    newUserAccount: (username: any ) => void;
}

function Display({newUserAccount}: DisplayInfoProps): JSX.Element {
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