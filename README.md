# How to Use Hooks

Hooks can be used inside any functional React component, but they can *only* be used inside a functional React component, or a custom Hook. You can also use the same hook multiple times in the same component to set up different operations, or values.

You can **not** use Hooks in:

- the global name space
- class based components
- loops
- conditional statements
- nested functions
- anything that's not a functional React component

---

# How Hooks Work

Each Hook has a slightly different use case, but there are some aspects of Hooks which apply to all of them

Hooks are just functions that come with the React package that allow functional components to access state, and lifecycle methods. You can import them by targeting them directly in your import

> e.g. `import React, { useState } from 'react'`

Each Hook can be used multiple times, but it is worth noting that *order is important*.

Hooks must be rendered in the same order every time to work properly which is why you can't use hooks inside loops, or conditionals.

---

# Benefits of Hooks

- the simplicity of a functional component with the power of a class based component
- allows related operations to be bundled together
- stateful logic can be reused between components
  - > Note: It's just the *logic* that is reused, not the values in state

---

# Types of Hooks

Your basic Hooks are:

- `useState`
- `useEffect`
- `useContext`

Less common Hooks are: 

- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImpreativeHandle`
- `useLayoutEffect`
- `useDebugValue`

`useState` and `useEffect` are by far the most common Hooks you will come across.

---

# Creating Custom Hooks

You can also create your own custom hooks by simply writing a function that performs the actions you want your hooks to take. This can be done to combine multiple hooks into one reusable operation, or to create an entirely new bit of functionality

---

# Hook Naming Conventions

It is important that you start the name of your custom Hook with `use` otherwise React won't recognize it as a valid hook.

> e.g. useMyCustomHook

---

# Refs, and Readings

- [Start here with the React docs](https://reactjs.org/docs/hooks-intro.html)

---

# useState

The `useState` hook allows you access to a functional component's state.

The first step to using `useState` is to import it from react

  - `import {useState} from 'react'`

Next we will set up two variables using array destructuring, and `useState`

  - `const [property, setProperty] = useState(initialValue)`

---

# Using `useState`

Calling the `useState` hook creates a property in your component's state object, with an initial value, and an updater function. We can then use our `setProperty` function to update our state.

  - (evt) => {setProperty(evt.target.value)}

`setProperty` takes the new value we want to set as `property` in our state. Note that our updater function is often wrapped in an event handler.

---

# useEffect

Like all other hooks `useEffect` must be directly imported from React before you can use it.

`useEffect` is used to setup what React refers to as "side effects." These are operations which fall outside the normal React render cycle, such as direct manipulation of the window objects, fetching data, setting up event listeners, or performing cleanup tasks.

---

# use Effect in the Lifecycle

You can think of `useEffect` as an all-in-one function for the `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle methods

`useEffect` can clean up after itself by returning a clean up function, but not every operation needs to be cleaned up.

---

# useEffect with no Cleanup

Effects that don't require a cleanup are actions that should be taken on every render. e.g. updating the `title` of your `document`. You can set these up by passing a callback function which performs the necessary action. This callback will be called every time the component renders, or rerenders

> If you wanted to update the title of the document from the previous lab to reflect the user's full name you could add a `useEffect(() => { document.title = fullName + "'s page"})` to your component

---

# Cleaning up After useEffect

If you are drawing data from an outside source, or you're subscribing to an external service you probably need to clean up after your effect to prevent a memory leak. To do this `return` a function from your `useEffect` callback that performs the cleanup tasks

---

# Clean useEffect Example

```js
useEffect(() => {
    if(user) {
     chatService.openConnection(user.id);
    }

    return function() {chatService.close()}
  })
```

The function that is returned from our callback (`function() {chatService.close()}`) will be called during the `componentWillUnmount` lifecycle stage


---

# Fetching Data

* Most React frontend apps (and most web apps in general) need server data
* The browsers `fetch` API can be used to fetch data from databases or other locations on the internet
* Fetched data should be stored in state, and the values in state are rendered to the page
* It is generally best practice to fetch when the component first mounts, during the `componentDidMount` lifecycle process

---

# Fetching Data Cont.

* Render an empty component first
* Get data after it has been rendered
* Re-render by setting the fetched data in state
* We can access the state and lifecycle render methods by using the `useState` and `useEffect` hooks respectively

---

# Fetching Data With Hooks

To fetch data (and store it) in a functional component we need to use Hooks

- first set up a property in state, and an updater function using `setState`
- then fetch the data with `useEffect`
- and use your updater function to set the fetched data in state
- use your state property to conditionally render data to the page when it's loaded

> Note: Changing state triggers a re-render, a re-render triggers `useEffect` so remember to wrap your state changes in conditionals, or you'll be trapped in an infinte render cycle.

---

# Fetching Data Example

```jsx

function DisplayPost(props) {
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(res => {
        setPost(res)
      })
  })
  
  return(
    <ul>
      {post}
    </ul>
  )
}

```

---

# Fetching Data - Handle Errors

* Errors in `fetch` using APIs happen
* Do not let an error ruin your page by raising in production
* Better to wait/retry and present a nice message

---

**Component with Error Handling**

```jsx
function AuthorList(props) {
  const [authors, setAuthors] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        setAuthors(res)
      }).catch((err) => {
        alert('Something went wrong...')
        console.error(err.message)
      })
  })
  
  return(
    <ul>
      {authors ? authors.map((author) => {
        return <li>{author.name}</li>
      }) : 'loading...'}
    </ul>
  )
}
```

---

# Fetching Data - Example

<https://codesandbox.io/embed/p99mqrq9z0>

<p data-height="500" data-theme-id="light" data-slug-hash="gjELaj" data-default-tab="js,result" data-user="Dangeranger" data-pen-title="Fetching API Data" class="codepen">See the Pen <a href="https://codepen.io/Dangeranger/pen/gjELaj/">Fetching API Data</a> by Joshua Burke (<a href="https://codepen.io/Dangeranger">@Dangeranger</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

---

# useState in useEffect

Using `useState` inside a `useEffect` callback is a fairly common practice, but you want to be a little careful when doing this

- `useState`'s updater function triggers the `componentDidUpdate` lifecycle event
- The callback function for `useEffect` gets called every time the component updates
- Using the updater directly inside your `useEffect` callback causes an infinite loop
- This is comparable to using `this.setState` inside `componentDidUpdate` in a class based component