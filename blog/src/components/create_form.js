import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateForm() {
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        // fetch('http://localhost:1337/posts', {
        //     method: 'POST',
        //     body: JSON.stringify({ title }),
        // });

        axios.post('http://localhost:1337/posts', {
            title: title,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
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