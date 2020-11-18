import React, { useEffect, useState } from 'react';

function CreateForm() {
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:1337/posts', {
            method: 'POST',
            body: JSON.stringify({ title }),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

        </form>
    )
}

export default CreateForm;