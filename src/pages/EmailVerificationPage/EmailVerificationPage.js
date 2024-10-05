import React from "react";
import "./EmailVerificationPage.scss";
import { RequestDemoPageProps } from "../../components/Props/RequestDemoPageProps";
import LeftBlock from "../../components/RequestLeftBlock/RequestLeftBlock";
import VerificationBlock from "../../components/VerificationBlock/VerificationBlock";

const EmailVerificationPage = () => {
  return (
    <div id="wrapper">
      <div id="content-area" className="email-verify-page">
        <div className="request-content">
          <div className="request-group">
            <div className="left">
              <LeftBlock {...RequestDemoPageProps.left_side} />
            </div>
            <div className="right">
              <VerificationBlock {...RequestDemoPageProps.emailverification} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
