import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { corpLogin } from 'src/services/auth-services/services.tsx';
import { CircularProgress } from '@material-ui/core';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import './SignInForm.scss';

const SignInForm = ({ userInfo }) => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertResponse, setAlertResponse] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (formData, e) => {
    setAlert(false);
    setAlertResponse(false);
    setLoading(true);
    const response = await corpLogin({
      company: userInfo?.id,
      email: formData.email,
      password: formData.password,
      voucher_code: formData.voucher_code || null,
    });
    setAlert(true);
    setAlertResponse(response);
    setLoading(false);
    if (response.status === true) {
      setTimeout(() => {
        if (response.data.is_owner) window.location.href = `/dashboard`;
        else window.location.href = `/home-user`;
        setLoading(false);
      }, 1000);
    }
  };
  const toLowerCase = (e) => {
    e.target.value = ('' + e.target.value).toLowerCase();
  };
  return (
    <div className="sign-in-block">
      <div className="sign-container">
        <div className="sign-header">
          <div className="title">Login To Whizlabs</div>
        </div>
        <div className="sign-content">
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box-group">
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  className="myemail"
                  placeholder="Email"
                  onInput={toLowerCase} // apply on input which  you want to be lower
                  {...register('email', {
                    required: 'This is required.',
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && errors.email.type === 'required' && (
                  <span style={{ color: 'red' }}>username is required</span>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <span style={{ color: 'red' }}>Please enter valid email</span>
                )}
              </div>
              <div className="input-box">
                <div className="inputPassword">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="mypass"
                    name="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'This is required.',
                    })}
                  />
                  <i className="VisiIcons" onClick={(e) => setShowPassword(!showPassword)}>
                    {' '}{showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                  </i>
                </div>
                {errors.password && errors.password.type === 'required' && (
                  <span style={{ color: 'red' }}>password is required</span>
                )}
              </div>
            </div>
            {alert && (
              <span style={{ color: alertResponse.status ? 'green' : 'red' }}>
                {alertResponse.msg}
              </span>
            )}
            {!loading ? (<button className="btn btn-orange">Login </button>) : (<CircularProgress size={15} />)}
          </form>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
