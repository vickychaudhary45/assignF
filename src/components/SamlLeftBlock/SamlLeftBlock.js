import React from "react";
import { Link } from "react-router-dom";
import "./SamlLeftBlock.scss";

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
      </div>
    </>
  );
};

export default LeftBlock;
