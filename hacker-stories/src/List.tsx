import Item from "./Item.tsx";
import * as React from "react";
import {Story} from "./types/Story";

type Stories = Story[];

type ListProps = {
    list: Stories,
    onRemoveItem: (item:Story) => void;
};

const List:React.FC<ListProps> = ({list, onRemoveItem}) => (
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