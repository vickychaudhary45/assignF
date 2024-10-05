import React from "react";
import { useAppState } from "src/stateManagement";
import "./AssignType.scss";

const AssignType = (props) => {
  const { state: App } = useAppState();
  return (
    <div className="assign-type">
      <div className="title">
        {props.title_type}
        <span>{props.star}</span>
      </div>
      <div className="checkbox-group">
        {props.checkbox.map((name, index) => {
          return (
            <>
              {!!App?.privileges?.is_trail && name.txt !== 'Courses' &&
                (<label className="checkbox-style" key={index}>
                  {name.txt}
                  <input type="checkbox" onChange={() => props.handleCheckbox(name.txt)} />
                  <span className="checkmark"></span>
                </label>)
              }
              {!!!App?.privileges?.is_trail &&
                (<label className="checkbox-style" key={index}>
                  {name.txt}
                  <input type="checkbox" onChange={() => props.handleCheckbox(name.txt)} />
                  <span className="checkmark"></span>
                </label>)
              }
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AssignType;
