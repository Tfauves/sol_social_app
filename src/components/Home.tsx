import React, {useState} from 'react';

interface HomeProps {
    displayHome: (username: string) => void;
}


function Home({displayHome}: HomeProps): JSX.Element {
    const [username, setUsername] = useState('');

    return (
        <div>

            <h1>{"hello"}</h1>
            <h1>{username}</h1>
        </div>
    )
}

export default Home;