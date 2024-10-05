import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppState } from "./stateManagement"

setTimeout(() => {
  const corpData = JSON.parse(localStorage.getItem('custom_login'));
  if (corpData?.enable_custom_login) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = corpData?.favicon ? `${process.env.REACT_APP_B2B_MEDIA_URL}${corpData?.favicon}` : "%PUBLIC_URL%/favicon.png";
    document.title = corpData?.company_name ? `Upskill your Entire Workforce with ${corpData?.company_name} Teams Account!` : `Upskill your Entire Workforce with Whizlabs Teams Account!`
  }
}, 2000)

const privilegeData = JSON.parse(localStorage.getItem('user_data'));

if (privilegeData?.data?.allow_whitelabeling) {
  localStorage.removeItem('custom_login');
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = privilegeData?.data?.favicon ? `${process.env.REACT_APP_B2B_MEDIA_URL}${privilegeData?.data?.favicon}` : "%PUBLIC_URL%/favicon.png";
  document.title = privilegeData?.data?.company_name ? `Upskill your Entire Workforce with ${privilegeData?.data?.company_name} Teams Account!` : `Upskill your Entire Workforce with Whizlabs Teams Account!`
}


ReactDOM.render(
  <AppState>
    <App />
  </AppState>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
