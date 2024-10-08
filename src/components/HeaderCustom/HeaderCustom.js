import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../config/images";
import BrochureContainer from "../BannerTechnology/BrochureContainer";
import Maintenance from "./../../components/Maintenance/Maintenance";
import "../HeaderCustom/HeaderCustom.scss"
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const HeaderCustom = () => {
  const onSubmit = (event) => {
    event.preventDefault(event);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [])
  return (
    <>
      <header>
        <div className="container">
          <div className="header-left">
            <a className="logo" href="/"><img className="img-full img-full-Aptech" src={images.logo_Aptech} alt="" /></a>
          </div>
          <div className="header-right">
          </div>

          {/* <!-- desktop and mobile dropdown --> */}
          <div className="dropdown-menu">
            <div className="step-1">
              <ul className="list-menu">
                <li>
                  <div className="nav-header">
                    <div className="title-block">
                      <div className="title">Navigation</div>
                      <div className="btn-close">Close</div>
                    </div>
                    <div className="btn-group">
                      <Link className="btn btn-login" to='/login'>Sign in</Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/request-demo-page?utm_source=header" className="forgot-password">Request Demo</Link>
                </li>
                <li className="btn-group">
                  <BrochureContainer triggerText={"Download Brochure"} onSubmit={onSubmit} />
                </li>
                <li>
                  <a href="#faqblock">FAQ’s</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Maintenance />
    </>
  );
};

export default HeaderCustom;
