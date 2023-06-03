import * as React from 'react';


const initialStories = [
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
]

const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                    (story) => action.payload.objectID !== story.objectID
                ),
            };
        default:
            throw new Error();
    }
};
const getAsyncStories = () =>
    new Promise((resolve) =>
        setTimeout(
            () => resolve({data: {stories: initialStories}}),
            2000
        )
    );

const App = () => {

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false},
    );

    React.useEffect(() => {
        dispatchStories({type: "STORIES_FETCH_INIT"});

        getAsyncStories()
            .then((result) => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data.stories,
                });
            })
            .catch(() => {
                dispatchStories({type: "STORIES_FETCH_FAILURE"})
            });
    }, []);


    const handleRemoveStory = (item) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    console.log(stories);

    const searchedStories = stories.data.filter(function (story) {
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
            >
                <strong>Search:</strong>
            </InputWithLabel>
            <hr/>
            {stories.isError && <p>Something went wrong</p>}

            {stories.isLoading ? (
                <p>loading...</p>
            ) : (
                <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
            )
            }
        </>
    );
};
const InputWithLabel = ({id, value, type = 'text', onInputChange, children, isFocused = true}) => {
    const inputRef = React.useRef();
    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
                ref={inputRef}
            />
        </>
    )
}

const List = ({list, onRemoveItem}) => (
    <ul>
        {list.map((item) => (
            <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
            />
        ))}
    </ul>
);

const Item = ({item, onRemoveItem}) => {
    const handleRemoveItem = () => {
        onRemoveItem(item);
    };
    return (
        <li>
        <span>
            <a href={item.url}>{item.title}</a> --
        </span>
            <span>  {item.author}</span>
            <span>  {item.num_comments}</span>
            <span>  {item.points}</span>
            <span>
            <button type="button" onClick={handleRemoveItem}>
            Dismiss
            </button>
        </span>
        </li>
    )
};

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
