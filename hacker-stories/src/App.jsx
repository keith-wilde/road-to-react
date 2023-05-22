import * as React from 'react';

const welcome = {
    greeting: "hi",
    title: "react"
}

function getGreeting() {
    return welcome.greeting
}

function getTitle() {
    return welcome.title
}

const myElement
    = React.createElement('h1', null, `${getGreeting()} ${getTitle()}`)

function App() {
    return (
        <div>
            {myElement}
            <label htmlFor="search">Search: </label>
            <input id="search" type="text"/>
        </div>
    )
}

export default App
