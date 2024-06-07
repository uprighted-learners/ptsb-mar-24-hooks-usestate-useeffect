import { useState, useEffect } from 'react';

// useFetch is our own custom hook

function useFetch(url) {

    /*
        Making state variables for data, loading, and error
    */
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
        useEffect use case here:

        Onload and whenever url is updated/changed, trigger the fetchData function
    */
    useEffect(() => {
        
        const fetchData = async () => {
            // use state variable updater functions to update state variable value for loading & error
            setLoading(true);
            setError(null);

            // try/catch for fetch
            try {
                const response = await fetch(url);
                console.log(response);

                // For whatever reason our fetch unsuccessfully gets the data, throw an error.
                if (!response.ok) {
                    throw new Error("An error occurred")
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                // If an error occurs, save the error to the error state variable.
                setError(error);
            } finally {
                // Whether successful or failed fetch, we are done loading so set the value of loading to false
                setLoading(false);
            }
        }

        fetchData();

    }, [url]) // Dependency array. Only contains url

    // Return the data, loading and error state variables from this useFetch hook
    return { data, loading, error }

}

export default useFetch;