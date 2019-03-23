import React from "react";
import './Dropdown.css';

const Dropdown = (props) => {
    return (
        <select className="dropdown" name={props.name} onChange={props.onChange}>
            {props.options.map(option => {
                return <option key={option} value={option}>{option}</option>

            })}
        </select>
    );
}

export default Dropdown;