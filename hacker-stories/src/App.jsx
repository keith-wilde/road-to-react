import * as React from 'react';

const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ];

    const handleSearch = (event) => {
        console.log("Handling Event: \n")
        console.log(event);
    }

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <Search onSearch={handleSearch}/>

            <hr/>

            <List list={stories}/>
        </div>
    );
};

const Search = (props) => {
    //    [state, state updater function] = React."react hook function"(initial state)
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = (event) => {
        // value of target (here: input HTML element)
        setSearchTerm(event.target.value);
        props.onSearch(event);
    };


    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange}/>

            <p>
                Searching For <strong>{searchTerm}</strong>
            </p>
        </div>
    );
};

const List = (props) => (
    <ul>
        {props.list.map((item) => (
            <Item key={item.objectID} item={item}/>
        ))}
    </ul>
);

const Item = (props) => (
    <li>
    <span>
      <a href={props.item.url}>{props.item.title} </a>
        {" => "}
    </span>
        <span>{props.item.author}</span>
        <span>{props.item.num_comments}</span>
        <span>{props.item.points}</span>
    </li>
);

export default App;
