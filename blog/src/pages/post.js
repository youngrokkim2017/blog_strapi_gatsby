import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
// import CreateForm from '../components/create_form';

function Form() {
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
        //     // const res = await fetch('http://localhost:1337/posts');
        //     const data = await res.json();

        //     console.log(data);
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
      <Layout>
        <CreateForm />
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
      </Layout>
    )
}

export default Form;

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

        window.location.reload(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{border: '1px solid black'}}
            />
            
            <button type="submit">Submit</button>
        </form>
    )
}