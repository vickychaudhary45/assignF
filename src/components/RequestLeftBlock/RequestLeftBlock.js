import React from "react";
import { Link } from "react-router-dom";
import "./RequestLeftBlock.scss";

const LeftBlock = (props) => {
  return (
    <>
      <div className="logo txt">
        <Link to="/" className="logo-white">
          <img className="img-full" src={props.img} alt="" />
        </Link>
      </div>
      <div className="caption-group txt">
        <div className="title">{props.title}</div>
        <ul>
          <label>{props.label}</label>
          {props.demo_learn.map((learn, index) => {
            return <li key={index}>{learn.txt}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default LeftBlock;
