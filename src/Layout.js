import React, { useEffect, useState, useContext } from "react";
import Header from "./components/HeaderDashboard/HeaderDashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import { privateRenderRoutes } from "./config/routes";
import { PermissionContexts } from "./PermissionContexts";
import moment from "moment";
import { Loading } from "./components/Loader/Loader";
import { parseJwt } from "./config/utils";
import { useHistory } from "react-router-dom";

const Layout = ({ children, mainClass }) => {
  // release-notes modal
  const { privileges } = useContext(PermissionContexts);
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const history = useHistory();
  let parseToken = parseJwt(user_data?.data?.token);
  let expiryDate = new Date(parseToken.exp * 1000);

  if (privileges?.is_employee) {
    let pathArray = window.location.pathname.split("/");
    let pathnameForConditon = pathArray[1];

    let privateRenderRoutesValues = Object.fromEntries(
      Object.entries(privateRenderRoutes).map(
        (el) => (
          (el[1] =
            Object.values(el[1])[1]["path"].split("/")[1] == pathnameForConditon
              ? Object.values(el[1])[1]["menuname"]
              : ""),
          el
        )
      )
    );
    let cleanObj = {};

    Object.keys(privateRenderRoutesValues).forEach((val) => {
      const newVal = privateRenderRoutesValues[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });
    let cleanObjFinal = Object.values(cleanObj);

    if (
      privileges?.is_owner ||
      privileges?.privileges.includes(cleanObjFinal[0])
    ) {
    } else {
      if (privileges?.is_owner) window.location.href = `/dashboard`;
    }
  }
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const now = moment();
    const priv = JSON.parse(localStorage.getItem("privilegesInfo"));

    if (JSON.parse(localStorage.getItem("feedback_form"))?.next_reminder) {
      const nextReminder = moment(
        JSON.parse(localStorage.getItem("feedback_form"))?.next_reminder
      );
      const isNowAfterNextReminder = now.isAfter(nextReminder);

      if (priv?.feedback_form && isNowAfterNextReminder) {
        setFeedbackModal((prev) => true);
      }
    } else {
      if (priv?.feedback_form) {
        setFeedbackModal((prev) => true);
      }
    }
  }, []);

  useEffect(() => {
    if (expiryDate) {
      if (
        moment().format("YYYY-MM-DD HH:mm:ss") >
        moment(expiryDate).format("YYYY-MM-DD HH:mm:ss")
      ) {
        localStorage.removeItem("user_data");
        localStorage.removeItem("custom_login");
        let user_login_url = localStorage.getItem("user_login_url");
        if (user_login_url) {
          localStorage.clear();
          window.location.href = user_login_url;
        } else {
          history.push("/login");
        }
      }
    }
  }, []);

  return (
    <>
      {!loading && privileges != 0 ? (
        <>
          <div className={`wrapper ${mainClass || ""}`}>
            <Header
              privileges={privileges}
              setFeedbackModal={setFeedbackModal}
            />
            <div id="content-area">
              <div className="content">
                <Sidebar />
                {children}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ position: "absolute", top: "46%", left: "46%" }}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Layout;
