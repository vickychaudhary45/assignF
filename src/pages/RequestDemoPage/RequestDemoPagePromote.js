import { RequestDemoPageProps } from "../../components/Props/RequestDemoPageProps";
import LeftBlockPromo from "../../components/RequestLeftBlock/RequestLeftBlockPromote";
import FillUpFormPromo from "src/components/FillUpForm/FillUpFormPromo";
import "../RequestDemoPage/RequestDemoPage.scss";

const RequestDemoPagePromote = () => {
  return (
    <div id="wrapper">
      <div id="content-area" className="request-demo-page">
        <div className="request-content">
          <div className="request-group">
            <div className="left">
              <LeftBlockPromo {...RequestDemoPageProps.left_side} />
            </div>
            <div className="right">
              <FillUpFormPromo />
              {/* <ThankYouBlock {...RequestDemoPageProps.thankyou} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestDemoPagePromote;
