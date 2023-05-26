// import * as React from 'react';


const App = () => {
    const stories = [{
        title: 'React', url: 'https://reactjs.org/', author: 'Some guy', num_components: 3, points: 4, objectID: 0

    }, {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Some other guy, Bill',
        num_components: 2,
        points: 5,
        objectID: 1
    }]

    return (<div>
        <h1>My Hacker Stores</h1>
        <Search/>
        <hr/>
        <List list={stories}/>
    </div>)
}

const List = (props) => (
    <ul>
        {props.list.map((item) => (
            <Item key={item.objectID} item={item}/>
        ))}
    </ul>
)

const Item = (props) => (
    <li>
        <span>
            <a href={props.item.url}>{props.item.title} </a>
        </span>
        <span>{props.item.author} </span>
        <span>{props.item.num_components} </span>
        <span>{props.item.points} </span>
    </li>
);

const Search = () => {
    const handleChange = (event) => {
        //synthetic event. Which is react's wrapper around browser's native event
        console.log(event);
        //Value of target (here: input HTML element)
        console.log(event.target.value);
    };

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange}/>
        </div>
    );
};


export default App
