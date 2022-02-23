import React, { useState, useEffect } from "react";
import './styles.scss';

const InputField = ({ type, placeholder, onTextChange, inputKey, defaultValue, isDisabled }) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
        onTextChange(value, inputKey);
    }, [value, onTextChange, inputKey, defaultValue])
    return (
        <input disabled={isDisabled} type={type || "text"} placeholder={placeholder} value={value} onChange={(ev) => setValue(ev.target.value)} />
    )
}

export default InputField;