import * as React from "react";
import styled from "styled-components";
import {Story} from "./types/Story";

type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
}
const Item = ({item, onRemoveItem}: ItemProps) => {
    const handleRemoveItem = () => {
        onRemoveItem(item);
    };

    return (
        <StyledItem>
            <StyledColumn>
                <a href={item.url}>{item.title}</a> --
            </StyledColumn>
            <StyledColumn width="%30">  {item.author}</StyledColumn>
            <StyledColumn width="%10">  {item.num_comments}</StyledColumn>
            <StyledColumn width="%10">  {item.points}</StyledColumn>

            <StyledButtonSmall type="button" onClick={handleRemoveItem}>
                Dismiss
            </StyledButtonSmall>

        </StyledItem>
    )
};


const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props) => props.width};

`;


const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #888888;
  padding-bottom: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;

  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

export default Item;