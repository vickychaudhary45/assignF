import React from "react";
import { SamlLoginPageProps } from "../../components/Props/SamlLoginPageProps";
import LeftBlock from "../../components/SamlLeftBlock/SamlLeftBlock";
import FillUpForm from "src/components/SamlFillUpForm/FillUpForm";
import "./SamlLoginPage.scss";

const SamlLoginPage = () => {
  return (
    <div id="wrapper">
      <div id="content-area" className="request-demo-page">
        <div className="request-content">
          <div className="request-group">
            <div className="left">
              <LeftBlock {...SamlLoginPageProps.left_side} />
              <FillUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamlLoginPage;
