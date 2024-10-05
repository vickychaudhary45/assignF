import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "src/services/auth-services/services";
import { CircularProgress } from "@material-ui/core";
import "../SignInForm/SignInForm.scss";

const ResetPasswordForm = () => {
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenfromUrl = urlParams.get("token");
    setToken(tokenfromUrl);
    const emailFromUrl = urlParams.get("email");
    setEmail(emailFromUrl);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      token,
      email: email,
      password: confirmPassword
    };
    if (password !== confirmPassword) {
      setError("Password and confirm password must be same");
      setLoading(false);
    } else {
      try {
        const response = await resetPassword(data);
        if (response.data.status === true) {
          setSuccess("Password reset successfull");
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
        else {
          setError("Something went wrong");
          setLoading(false);
        }
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  }
  return (
    <div className="sign-in-block">
      <div className="sign-container">
        <div className="sign-header">
          <div className="title">Reset Password</div>
        </div>
        <div className="sign-content">
          <form onSubmit={handleSubmit}>
            <div className="input-box-group">
              <div className="input-box">
                <input id="emailfeild" type="email" placeholder="Email" value={email} disabled style={{ backgroundColor: "#f5f5f5" }} />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            {error ? <span className="error" style={{ color: "red" }}>{error}</span> : null}
            {success ? <span className="success" style={{ color: "green" }}>{success}</span> : null}
            {!loading ? <button className="btn btn-send" type="submit">Submit</button>
              : (<CircularProgress size={15} className="button-progress" />)}
          </form>
          <Link to="/login" className="forgot-password">
            Remember Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
