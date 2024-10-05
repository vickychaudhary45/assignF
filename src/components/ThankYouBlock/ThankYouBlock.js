import React from "react";
import { Link } from "react-router-dom";
import "./ThankYouBlock.scss";

const ThankYou = (props) => {
  return (
    <div className="thank-you-block">
      <figure>
        <img className="img-full" src={props.img} alt="" />
      </figure>
      <div className="caption-group">
        <div className="title">{props.title}</div>
        <p>{props.para}</p>
        <Link to="/" className="link">
          <i className="icon-arrow-right"></i>
          <span>{props.btn_txt}</span>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
