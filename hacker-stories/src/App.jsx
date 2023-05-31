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

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        localStorage.setItem('search', event.target.value);
    }


    const searchedStories = stories.filter(function (story) {
        return story.title.toLowerCase().includes(searchTerm.toLowerCase())                     // TODO, improve this if not done in tutorial
            || story.url.toLowerCase().includes(searchTerm.toLowerCase())
            || story.author.toLowerCase().includes(searchTerm.toLowerCase());
    })

    return (
        <>
            <h1>My Hacker Stories</h1>

            <InputWithLabel
                id="search"
                label="Search"
                value={searchTerm}
                onInputChange={handleSearch}
            />
            <hr/>

            <List list={searchedStories}/>
        </>
    );
};
const InputWithLabel = ({id, label, value,type='text', onInputChange}) => (
    <>
        <label htmlFor={id}>{label}</label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
)

const List = ({list}) => (
    <ul>
        {list.map(({objectID, ...item}) => (
                <Item key={objectID} {...item} />
            )
        )}
    </ul>
);

const Item = ({title, url, author, num_comments, points}) => (
    <li>
    <span>
      <a href={url}>{title} </a>
        {" => "}
    </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
    </li>
);

//Custom React Hook
const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

    React.useEffect(() => {
            localStorage.setItem(key, value);
        }, [value, key]
    );

    return [value, setValue];
}


export default App;
