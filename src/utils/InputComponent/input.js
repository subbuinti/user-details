import React from "react";

export default function InputField(props) {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        className={props.className}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        checked={props.checked}
      />
    </div>
  );
}
