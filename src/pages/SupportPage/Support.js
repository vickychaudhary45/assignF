import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { images } from "../../config/images";
import Help from "../../assets/brochure/Whizlabs_Business_Competency_Plus.pdf";
import SupportTab from "../../components/SupportTable/SupportQueryTable";
import { useAppState } from "src/stateManagement";
import "../SupportPage/Support.scss";

const Support = () => {
  const {state: App} = useAppState()

  return (
    <Layout>
      <div className="main-content">
        <div className="support-page">
          <div className="support-banner">
            <div className="container">
              <div className="heading">
                <h1>We’re here to help!</h1>
                <p>Ask us everything and we’d love to hear from you</p>
              </div>
              <div className="block-group" style={{ gridTemplateColumns: App?.privileges.is_owner ? "repeat(4, 1fr)" : "repeat(3, 1fr)" }}>
                <div className="block">
                  <figure> <img className="img-full" src={images.mailicon} alt="" /></figure>
                  <div className="title">Email Support</div>
                  <a target="_blank" href="mailto:contact@whizlabs.com"> contact@whizlabs.com</a>
                </div>
                <div className="block">
                  <figure> <img className="img-full" src={images.whatsappicon} alt="" /></figure>
                  <div className="title">WhatsApp us</div>
                  <a target="_blank" href="//wa.me/919091849091"> +91-9091849091 </a>
                </div>
                <div className="block">
                  <figure> <img className="img-full" src={images.brochureicon} alt="" /></figure>
                  <div className="title">Brochure</div>
                  <a href={Help} target="_blank" rel="noreferrer"> Download </a>
                </div>
                {App?.privileges.is_owner && !App?.privileges.allow_whitelabeling ? (
                  <Link className="block query-block" to="/query-page">
                    <figure> <img className="img-full" src={images.ticket} alt="" /></figure>
                    <div className="title">Support</div>
                    <div style={{ margin: "0px" }}>
                      <button className="btn-query"> Submit Your Queries </button>
                    </div>
                  </Link>
                ) : (" ")}
              </div>
            </div>
          </div>
        </div>
        {App?.privileges.is_owner && !App?.privileges.allow_whitelabeling ? <SupportTab /> : ""}
      </div>
    </Layout>
  );
};

export default Support;
