import React from "react";
import { isLoggedIn } from "src/config/utils";
import LayoutTwo from "../../LayoutTwo";
import SignInForm from "../../components/SignInForm/SignInForm";
import { Redirect } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  if (isLoggedIn()) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }

  return (
    // <LayoutTwo>
    <div className="main-content login-page">
      <div className="container-big">
        <SignInForm />
      </div>
    </div>
    // </LayoutTwo>
  );
};

export default LoginPage;
