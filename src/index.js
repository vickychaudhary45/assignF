import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppState } from "./stateManagement";

setTimeout(() => {
  const corpData = JSON.parse(localStorage.getItem("custom_login"));
  if (corpData?.enable_custom_login) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    document.title = `feedback portal`;
  }
}, 2000);

const privilegeData = JSON.parse(localStorage.getItem("user_data"));

if (privilegeData?.data?.allow_whitelabeling) {
  localStorage.removeItem("custom_login");
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  document.title = `feedback portal`;
}

ReactDOM.render(
  <AppState>
    <App />
  </AppState>,
  document.getElementById("root")
);
