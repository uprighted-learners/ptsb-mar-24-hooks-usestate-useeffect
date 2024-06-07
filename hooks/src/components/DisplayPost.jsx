import { useState, useEffect } from "react";

function DisplayPost(props) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setPost(res);
            })
    }, []);


    return (
        <ul>
            {post && post.title}
            {post && post.body}
        </ul>
    )
}

export default DisplayPost;