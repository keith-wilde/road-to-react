import * as React from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
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

const App = () => {

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false},
    );

    const handleFetchStories = React.useCallback(() => {
        if (!searchTerm) return;

        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        fetch(`${API_ENDPOINT}${searchTerm}`)
            .then((response) => response.json())
            .then((result) => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                });
            })
            .catch(() =>
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
            );
    }, [searchTerm]);

    React.useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = (item) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


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
                <List list={stories.data} onRemoveItem={handleRemoveStory}/>
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
