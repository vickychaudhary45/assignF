import React, { useEffect } from "react";
import { samlLoginWithTOken } from 'src/services/auth-services/services';
import { useParams } from "react-router-dom";
import "./FillUpForm.scss";
import "../../components/ThankYouBlock/ThankYouBlock.scss";

const FillUpForm = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const params = useParams();
  const { company, token } = params;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(async () => {
    if (token) {
      setLoading(true)
      const response = await samlLoginWithTOken(token);
      if (response.status === true) {
        setTimeout(() => {
          if (response.data.is_owner)
            window.location.href = `/dashboard`;
          else
            window.location.href = `/home-user`;
          setLoading(false);
        }, 1000);
      }
      else {
        setError("Something went wrong");
        setLoading(false);
      }
    }
  }, [token])

  return (
    <>
      <div className="fill-up-box">
        <div className="btn-group">
          <a className="btn btn-demo" href={`${baseUrl}/saml/request`}>Login</a>
        </div>
      </div>
    </>
  );
};

export default FillUpForm;
