import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../config/images";
import "./RequestLeftBlock.scss";

const LeftBlockPromo = (props) => {
  const [checkSlug, setCheckSlug] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCheckSlug(localStorage.getItem("type"));
    }, 0);
  }, [checkSlug])

  return (
    <div>
      <div className="logo txt">
        <Link to="/" className="logo-white">
          {checkSlug === "visa" ?
            <img className="logo-visa" src={images.visa} alt="visa-whizlabs" />
            : <img className="logo-mastercard" src={images.mastercard} alt="mastercard-whizlabs" />
          }
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
    </div>
  );
};

export default LeftBlockPromo;
