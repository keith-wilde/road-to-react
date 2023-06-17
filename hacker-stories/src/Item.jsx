import * as React from "react";

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

export default Item;