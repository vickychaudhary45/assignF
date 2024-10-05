import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { emailVerify } from "src/services/auth-services/services";
import "./VerificationBlock.scss";

const VerificationBlock = (props) => {
  const [msg, setMsg] = useState("")
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  useEffect(async()=>{
    const formData = {
      token: token, email: email
    }
    if(token){
      const res = await emailVerify(formData);
      if(res.status === true){
        setMsg(res.msg)
      }
    }
  },[token])

  return (
    <div className="verification-block">
      <figure>
        <img className="img-full" src={props.img} alt="" />
      </figure>
      <div className="caption-group">
        <div className="title">{props.title}</div>
        <p>{msg ? msg : "Your email verified successfully."}</p>
        <Link to="/" className="link">
          <i className="icon-arrow-right"></i>
          <span>{props.btn_txt}</span>
        </Link>
      </div>
    </div>
  );
};

export default VerificationBlock;
