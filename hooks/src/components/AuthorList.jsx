import { useState, useEffect } from "react";
import Author from "./Author";

function AuthorList(props) {
    // state variables with state variable updater functions
    const [authors, setAuthors] = useState(null);
    const [input, setInput] = useState("");
    const [value, setValue] = useState("");

    // useEffect use case: fetch users from api when component loads
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // use setValue within useEffect
                setValue(res);
                // Check if response from api is an array
                if (Array.isArray(res)) {
                    // If so, then set authors state variable to the array response
                    setAuthors(res);
                } else {
                    // If not, then throw an error
                    throw new Error("An error occurred")
                }
                
            }).catch((err) => {
                alert("Something went wrong...");
                console.log(err.message);
            })
    }, []);

    // You can have multiple of the same hooks within a component.
    // Use another useEffect if you want different logic to be triggered
    useEffect(() => {

    }, [])

    return (
        <>
            <input type="text" onChange={(e) => setInput(e.target.value)}/>

            <ul>
                {/* Conditional rendering done here. */}
                {/* We need to make sure 'authors' is not null. */}
                {/* authors is expected to be an array. We use map because it will help return JSX for each author */}
                {/* Whenever 'authors' is null, display 'Loading...' */}
                {authors ? authors.map((author) => {
                    return <li key={author.id}>{author.name}</li>
                }) : "Loading..." }
            </ul>

                {/* This ul element is doing the same thing as above but we are using the Author component for every author in the authors array */}
            <ul>
                {authors ? authors.map((author) => {
                    // Tag in the props using the data from each author
                    return <Author author={author} name={author.name} key={author.id} id={author.id}/>
                }) : "Loading..." }
            </ul>
        
        </>

    )
}

export default AuthorList;