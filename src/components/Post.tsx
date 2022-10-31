import React, {useState} from 'react';

interface NewPostProps {
    newPost: (content: string) => void;
}

function SendPost({newPost}: NewPostProps): JSX.Element {
    const [content, setContent] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if(!content) return;
        newPost(content);
        setContent('');
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="post"></label>
            <input value={content} placeholder="say something" onChange={e => setContent(e.target.value)} id='post' type='text' className='form-control' />
            <button className='btn btn-outline-secondary my-3' type='submit'>post something</button>
        </form>
    )

}
export default SendPost;