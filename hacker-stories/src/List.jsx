import Item from "./Item.jsx";
import * as React from "react";

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

export default List;