import React from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "src/services/auth-services/services";
import { CircularProgress } from "@material-ui/core";
import "../SignInForm/SignInForm.scss";

const CustomForgetPasswordForm = ({ login, slug }) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [disableInput, setDisableInput] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
    setSuccess("")
    if (!email) {
      setError("Email is required");
      setLoading(false);
    }
    else if (email) {
      const data = {
        email: email,
        slug: slug
      };
      setDisableInput(true);
      await forgotPassword(data).then((res) => {
        setLoading(false);
        if (res?.data?.status === 'error') {
          setError('This email is not registered!');
        } else {
          setSuccess("Password Reset Email Sent Successfully");
        }
      }).catch((err) => {
        setLoading(false);
        setError("Email not found");
      });
    }
  };
  return (
    <div className="sign-in-block">
      <div className="sign-container">
        <div className="sign-header">
          <div className="title">Forgot Password</div>
        </div>
        <div className="sign-content">
          <form onSubmit={handleSubmit}>
            <div className="input-box-group">
              <div className="input-box">
                <input id="emailfeild" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={disableInput ? "disabled" : ""} style={disableInput ? { backgroundColor: "#f5f5f5" } : { backgroundColor: "#fff" }} />
                {error ? <span className="error" style={{ color: "red" }}>{error}</span> : null}
                {success ? <span className="success" style={{ color: "green" }}>{success}</span> : null}
              </div>
            </div>
            {!loading ? <button className="btn btn-send" style={{ backgroundColor: login.login_page_colour }} type="submit">Send</button>
              : (<CircularProgress size={15} className="button-progress" />)}
          </form>
          <Link to={`/login/${slug}`} className="forgot-password">
            Remember Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomForgetPasswordForm;
