import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BrochureContainer from "../BannerTechnology/BrochureContainer";
import Maintenance from "./../../components/Maintenance/Maintenance";
import "../HeaderSlug/HeaderSlug.scss"
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const HeaderSlug = ({ login }) => {
  const baseUrl = process.env.REACT_APP_B2B_MEDIA_URL;
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
            <a className="logo" ><img style={{width:"100px"}} src={baseUrl + "company-logos/"+ login?.login_page_logo} alt="" /></a>
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

export default HeaderSlug;
