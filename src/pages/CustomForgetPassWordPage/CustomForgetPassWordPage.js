import React from "react";
import CustomForgetPasswordForm from "src/components/CustomForgetPasswordForm/CustomForgetPasswordForm";
import LayoutTwo from "src/LayoutTwo";
import { CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';
import { CheckCustomization } from "src/shared/checkCustomization";
import "./CustomForgetPassWordPage.scss";

const CustomForgetPassword = () => {
  const { slug } = useParams();
  let { enableLogin, customLogin, isLoading } = CheckCustomization()

  return (
    <React.Fragment>
      {!isLoading ? (
        <>
          {
            enableLogin === 1 &&
            <LayoutTwo login={customLogin}>
              <div className={"main-content login-page "}>
                <div className={"container-big"}>
                  <CustomForgetPasswordForm login={customLogin} slug={slug} />
                </div>
              </div>
            </LayoutTwo>
          }
        </>
      ) : (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default CustomForgetPassword;
