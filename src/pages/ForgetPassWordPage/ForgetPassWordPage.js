import React from "react";
import LayoutTwo from "../../LayoutTwo";
import ForgetPasswordForm from "../../components/ForgetPasswordForm/ForgetPasswordForm";
import "./ForgetPassWordPage.scss";

const ForgetPassword = () => {
  return (
    <LayoutTwo>
      <div className="main-content forget-password-page">
        <div className="container-big">
          <ForgetPasswordForm />
        </div>
      </div>
    </LayoutTwo>
  );
};

export default ForgetPassword;
