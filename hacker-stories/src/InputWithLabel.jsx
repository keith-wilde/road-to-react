import * as React from "react";

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
export default InputWithLabel