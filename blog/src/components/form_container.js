import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormContainer() {
    // function getPosts() {
    //     fetch('http://localhost:1337/posts')
    //     .then((res) => res.json())
    //     .then(console.log)
    //     .catch()
    // }

    // useState is used to store variables that are going to be rendered
    const [posts, setPosts] = useState([]);

    // When the page is mounted it will run useEffect
    // which will mount the page with getPosts()
    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        // try {
        //     // fetch is JS built in
        //     // could also use axios instead of fetch
        //     // const res = await axios.get('http://localhost:1337/posts');
        //     const res = await fetch('http://localhost:1337/posts');
        //     const data = await res.json();

        //     // console.log(data);
        //     setPosts(data);
        // } catch (err) {
        //     console.error(err);
        // }

        axios.get('http://localhost:1337/posts')
            .then((response) => {
                console.log(response.data);
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default FormContainer;