import React from "react";
import InputField from "../InputComponent/input";

const ToggleSwitch = (props, { label }) => {
  return (
    <div>
      <div className="mr-4">
        <InputField
          type={props.type}
          id={props.id}
          className={props.className}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          checked={props.checked}
        />
        <label>Male</label>
      </div>
      <div>
        <InputField
          type={props.type}
          id={props.id1}
          className={props.className}
          name={props.name1}
          onChange={props.onChange1}
          value={props.value1}
          checked={props.checked1}
        />
        <label>Female</label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
