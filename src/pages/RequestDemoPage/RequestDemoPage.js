import React from "react";
import { RequestDemoPageProps } from "../../components/Props/RequestDemoPageProps";
import LeftBlock from "../../components/RequestLeftBlock/RequestLeftBlock";
import FillUpForm from "../../components/FillUpForm/FillUpForm";
import ThankYouBlock from "../../components/ThankYouBlock/ThankYouBlock";
import "./RequestDemoPage.scss";

const RequestDemoPage = () => {
  return (
    <div id="wrapper">
      <div id="content-area" className="request-demo-page">
        <div className="request-content">
          <div className="request-group">
            <div className="left">
              <LeftBlock {...RequestDemoPageProps.left_side} />
            </div>
            <div className="right">
              <FillUpForm />
              {/* <ThankYouBlock {...RequestDemoPageProps.thankyou} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemoPage;
