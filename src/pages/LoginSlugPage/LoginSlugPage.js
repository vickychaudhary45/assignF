import React, { useState, useEffect } from "react";
import { isLoggedIn } from "src/config/utils";
import LayoutTwo from "../../LayoutTwo";
import { Redirect, useParams } from 'react-router-dom';
import SignInCustomForm from "src/components/SigninCustom/SignInFormCustom";
import { CircularProgress} from "@mui/material";
import { CheckCustomization } from "src/shared/checkCustomization";
import Error404 from "src/shared/ErrorPage";
import "../LoginPage/LoginPage.scss";

const LoginPage = () => {
  const { slug } = useParams();
  let { enableLogin, customLogin, isLoading } = CheckCustomization()
  const domainAccessInfo = JSON.parse(localStorage.getItem('domainAccessInfo'));
  const [loading, setLoading] = useState(true);
  let classNameForFullScreen = '';
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (domainAccessInfo?.companyInfo?.allow_whitelabeling) {
    classNameForFullScreen = 'login-page-full';
  }
  if (isLoggedIn()) {
    return <Redirect to={{ pathname: '/dashboard' }} />;
  }

  return (
    <React.Fragment>
      {!loading ? (
        enableLogin === 1 ? (
          <LayoutTwo login={customLogin}>
            <div className={"main-content login-page " + classNameForFullScreen}>
              <div className={"container-big"}>
                <SignInCustomForm login={customLogin} slug={slug} />
              </div>
            </div>
          </LayoutTwo>
        ) : (
          <div>
            <Error404 />
          </div>
        )
      ) : (
        <div className="spinner">
          {<CircularProgress />}
        </div>
      )}
    </React.Fragment>
  );
};
export default LoginPage;
