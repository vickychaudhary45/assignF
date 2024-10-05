import React from "react";
import LayoutTwo from "../../LayoutTwo";
import CustomResetPasswordForm from "src/components/CustomResetPasswordForm/CustomResetPasswordForm";
import { useParams } from 'react-router-dom';
import { CheckCustomization } from "src/shared/checkCustomization";
import { CircularProgress } from "@mui/material";
import "./CustomResetPassword.scss";

const CustomResetPassword = () => {
  const { slug } = useParams();
  let { enableLogin, customLogin, isLoading } = CheckCustomization()

  return (
    <React.Fragment>
      {!isLoading ? (
        <>
          {enableLogin === 1 &&
            <LayoutTwo login={customLogin}>
              <div className={"main-content login-page "}>
                <div className={"container-big"}>
                  <CustomResetPasswordForm login={customLogin} slug={slug} />
                </div>
              </div>
            </LayoutTwo>}
        </>
      ) : (
        <div className="spinner resetpage-spinner">
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default CustomResetPassword;
