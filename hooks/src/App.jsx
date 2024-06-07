import { useState, useRef, useEffect } from 'react'
import useFetch from './hooks/useFetch'
import DisplayPost from './components/DisplayPost'
import AuthorList from './components/AuthorList'
import './App.css'

function App() {

  // fetchResult is for our JSX for a loading or error message
  let fetchResult = <div></div>
  // state variable: counter
  // state variable update function: setCounter
  // counter will start off with a value of 0
  const [counter, setCounter] = useState(0);
  // Make use of our custom hook: useFetch()
  // useFetch returns back data, loading and error
  const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon");
  // useRef hook. countRef will not rerender the component when it is updated
  const countRef = useRef(0);
  countRef.counter = 0;

  // useRef hook for inputElement. This will attached on the JSX element.
  const inputElement = useRef();

  console.log("App component rendered!");


  if (loading) {
    fetchResult = <p>Loading...</p>
  }

  if (error) {
    fetchResult = <p>Error occurred</p>
  }

  // handleRef is called when the Click to Update Ref Counter button is clicked
  // This function will update the counter property within countRef
  const handleRef = () => {
    console.log(countRef);
    countRef.counter = countRef.counter + 1; // countRef.current++ countRef.current += 1
  }

  const focusOnInput = () => {
    inputElement.current.focus();
  }

  // buttonHandlerFunction is called when the Click to Update Counter button is clicked
  const buttonHandlerFunction = () => {
    console.log("Before", counter);
    setCounter((prev) => {
      // using your state variable's updater function, you can access the previous/current value inside here
      // and do your logic
      const newValue = prev + 1;
      console.log("During", newValue);

      // This return is to update the counter state variable value.
      return prev + 1;
    });
    console.log("After", counter);
  }

  return (
    <>
      <AuthorList />


      <DisplayPost />


      <input type="text" ref={inputElement} />
      <button onClick={focusOnInput}>Click to focus on input field</button>


      <button onClick={buttonHandlerFunction}>Click to Update Counter</button>

      <button onClick={handleRef}>Click to Update Ref Counter</button>
      {counter}
      <div>
        {JSON.stringify(data)}
      </div>

      {fetchResult}
    </>
  )
}

export default App
