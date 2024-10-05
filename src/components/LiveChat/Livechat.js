import { useEffect } from "react";
import "./Livechat.scss"

const Livechat = () => {
  useEffect(() => {
    let livechat_ele = document.getElementById("chat-widget-container");
    if (livechat_ele) {
      livechat_ele.style.visibility = "visible";
    } else {
      window.__lc = window.__lc || {};
      window.__lc.license = 8761536;
      (function () {
        let lc = document.createElement("script");
        lc.type = "text/javascript";
        lc.async = true;
        lc.src = ("https:" == document.location.protocol ? "https://" : "http://") + "cdn.livechatinc.com/tracking.js";
        lc.id = "livechat007";
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(lc, s);
      })();
    }
    return () => {
      let livechat_ele = document.getElementById("chat-widget-container");
      if (livechat_ele) {
        livechat_ele.style.visibility = "hidden";
      }
    };
  }, []);
  return (
    <>
      {/* <br /> */}
    </>
  );
};

export default Livechat;
