import React from "react";
import LayoutTwo from "../../LayoutTwo";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import "./ResetPassword.scss";

const ForgetPassword = () => {
  return (
    <LayoutTwo>
      <div className="main-content forget-password-page">
        <div className="container-big">
          <ResetPassword />
        </div>
      </div>
    </LayoutTwo>
  );
};

export default ForgetPassword;
