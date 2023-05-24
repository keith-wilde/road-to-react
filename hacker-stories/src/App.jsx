// import * as React from 'react';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Some guy',
        num_components: 3,
        points: 4,
        objectID: 0

    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Some other guy, Bill',
        num_components: 2,
        points: 5,
        objectID: 1
    }
]


function App() {
    return (
        <div>
            <h1>My Hacker Stores</h1>
            <Search />
            <hr/>
            <List />
        </div>
    )
}

function List() {
    return (
        <div>

            <ul>
                {list.map(function (item) {
                    return <li key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title} </a>
                        </span>

                        <span>{item.author} </span>
                        <span>{item.num_components} </span>
                        <span>{item.points} </span>
                    </li>
                })}
            </ul>
        </div>
    );
}

function Search(){
    return (
        <div>

            <label htmlFor="search">Search: </label>
            <input id="search" type="text"/>

        </div>
    )
}

export default App
